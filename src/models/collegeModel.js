const mongoose = require('mongoose')


const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Enter your college name"],
        unique: true
    },

    fullName: {
        type: String,
        required: [true, "Enter your college fullName"]
    },

    logoLink: {
        type: String,
        required: [true, "Enter a valid link"]
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('College', collegeSchema) //colleges