const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    LastName:{
        type: String
    },
    contact:{
        type: String,
    },
    Email:{
        type: String,
    },
    password:{
        type: String,    
    },
    Course:{
        type: Number,
    }
})
const StudentModel = mongoose.model("Students",StudentSchema)
module.exports = StudentModel;