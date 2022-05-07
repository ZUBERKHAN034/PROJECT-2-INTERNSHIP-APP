const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validator = require('../validator/validation')

///////////////// [ CREATE COLLEGE HANDLER ] /////////////////
const createCollege = async function (req, res) {

    try {

        const requestBody = req.body

        if (!validator.isValidReqBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Invalid request! Please provide college details" })
        }

        if (!validator.isValid(requestBody.name)) {
            return res.status(400).send({ status: false, msg: "Please provide college name" })
        }

        if (!validator.isValid(requestBody.fullName)) {
            return res.status(400).send({ status: false, msg: "Please provide college fullName" })
        }

        if (!validator.isValid(requestBody.logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide college logoLink" })
        }

        if (!validator.isValidURL(requestBody.logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide a valid college logoLink" })
        }

        const isPresentCollege = await collegeModel.findOne({ name: requestBody.name })
        if (isPresentCollege) {
            return res.status(400).send({ status: false, msg: "college already exists." })
        }

        const collegeCreated = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, msg: "College Successfully Created", data: collegeCreated })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


///////////////// [ INTERNS DETAILS HANDLER ] /////////////////
const getInternsByCollege = async function (req, res) {

    try {

        const query = req.query

        if (!validator.isValidReqBody(query)) {
            return res.status(400).send({ status: false, msg: "Provide a query [ collegeName ]" })
        }

        if (Object.keys(query).length > 1) {
            return res.status(400).send({ status: false, msg: "Only single query is allowed!" })
        }

        const foundedCollege = await collegeModel.findOne({ name: query.collegeName })
        if (!foundedCollege) {
            return res.status(404).send({ status: false, msg: "College not found" })
        }

        const interns = await internModel.find({ collegeId: foundedCollege._id }).select({ _id: 1, email: 1, name: 1, mobile: 1 })
        if (interns.length === 0) {
            return res.status(404).send({ status: false, msg: `Intern details not found for ${query.collegeName} ` })
        }

        const allData = {
            name: foundedCollege.name,
            fullName: foundedCollege.fullName,
            logoLink: foundedCollege.logoLink,
            interests: interns
        }

        res.status(200).send({ status: true, data: allData })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

///////////////// [ EXPORTED HANDLER ] /////////////////
module.exports.createCollege = createCollege;
module.exports.getInternsByCollege = getInternsByCollege;