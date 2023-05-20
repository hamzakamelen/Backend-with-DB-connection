const mongoose = require("mongoose")

const InstituteSchema = new mongoose.Schema({
    InstituteName:{
        type:String,
        required:true
    },
    InstituteLocation:{
        type:String,
        required:true
    }
})

const InstituteModel = mongoose.model("InstituteName",InstituteSchema)

module.exports = InstituteModel;