const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    text:{
        type: String,
        required:true
    },
    // id:{
        // type: Integer
    // }
})
const StudentModel = mongoose.model("StudentName",StudentSchema)
// const StudentID = mongoose.model("StudentId",StudentSchema)
module.exports = StudentModel;