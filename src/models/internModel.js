const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
{

    name:{
        type:String,
        required:[true,'Name is Required']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Email is Required']
    },
    mobile:{
        type:Number,
        unique:true,
        required:[true,'Mobile is Required within 10 digits only'],
        maxlength:10
    },
    collegeId:{
        type:ObjectId,
        ref:('College'),
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


module.exports = mongoose.model ('Intern',internSchema);