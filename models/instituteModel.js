const mongoose = require("mongoose")

const InstituteSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    }
})

const InstituteModel = mongoose.model("InstituteName",InstituteSchema)

module.exports = InstituteModel;