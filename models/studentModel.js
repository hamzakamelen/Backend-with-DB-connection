const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    LastName:{
        type: String
    },
    contact:{
        type: String,
        required:true
    },
    Course:{
        type: Number,
        required:true
    }
})
const StudentModel = mongoose.model("Students",StudentSchema)
module.exports = StudentModel;