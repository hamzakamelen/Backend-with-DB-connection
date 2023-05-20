const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    text:{
        type:String,
        require: true
    }

});

const TeacherModel = mongoose.model('TeacherName',TeacherSchema)

module.exports = TeacherModel;