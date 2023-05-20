const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    text:{
        type:String,
    //Required lgany se ye hoga k agr string nahi ayi to API p hit hi nahi krega
        required:true,
    }
});
//Name pass krna hai , Schema
const TodoModel = mongoose.model('todo',TodoSchema)

module.exports = TodoModel;