//IMPORT
const express = require("express");
const InstituteModel = require("../models/instituteModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

// GET DATA
route.get('/',async (req, res) => {
    try{
    const result = await InstituteModel.find()
    if(!result){
        res.send(sendResponse(false,null,"Data Not Found")).status(404)
    }else{
        res.send(sendResponse(true,result)).status(200)
    }
}
catch(err){
    res.send(sendResponse(false,null,"internal Server Error",err)).status(400)
}  
    // res.send("Get All Institute Data")
})
// ----------------------
// GET DATA BY SPECIFIC ID
route.get('/:id',async (req, res) => {
   try{
    let id = req.params.id;
    let result = await InstituteModel.findById(id);
    if(!result){
        res.send(sendResponse(false,null,"Data Not Found")).status(404);
    }else{
        res.send(sendResponse(true,result,"Successfull")).status(200)
    }
   }
catch(err){
    res.send(sendResponse(false,null,"Internal Error",err)).status(400);
}
    // res.send("Get Single Institute Data")
})
// ----------------------
// POST DATA
route.post('/', async (req, res) => {
    const {InstituteName,InstituteLocation,ShortName,contact} = req.body
    try{
let ErrorArray = []
    if(!InstituteName){
        ErrorArray.push("Required : Institute Name")
    }
    if(!InstituteLocation){
        ErrorArray.push("Required : Institute Location")
    }
    if(!ShortName){
        ErrorArray.push("Required : Institute ShortName")
    }
    if(!contact){
        ErrorArray.push("Required : Institute Contact")
    }
    if(ErrorArray.length>0){
        res.send(sendResponse(false,null,"Required Data",ErrorArray))
    }else{
        let obj = {InstituteName,InstituteLocation,ShortName,contact}
        let institutedata = new InstituteModel(obj);
        await institutedata.save()
        if(!institutedata){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
        res.send(sendResponse(true,institutedata,"Saved Successfully")).status(200)
        }
    }
}catch(err){
    res.send(sendResponse(false,null,"internal Server Error",err)).status(404)
}
    // res.send("Post Institute Data")
})
// ----------------------
// PUT DATA
route.put('/:id',async (req, res) => {
    try{
        let id = req.params.id
        let result = await InstituteModel.find(id)
        if(!result){
            res.send(sendResponse(false,null,"Not Found")).status(404)
        }else{
            let updateResult = await InstituteModel.findByIdAndUpdate(id,req.body,{new:true})
            if(!updateResult){
                res.send(sendResponse(false,null,"Error")).status(404)
            }else{
                res.send(sendResponse(true,updateResult,"Updated Successful")).status(200)
            }
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
    // res.send("Edit Institute Data")
})
// ----------------------

// DELETE DATA
route.delete('/:id',async (req, res) => {
    try{
        let id = req.params.id
        let result = await InstituteModel.findById(id)
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            let deleteResult = await InstituteModel.findByIdAndDelete(id)
            if(!deleteResult){
                res.send(sendResponse(false,null,"Error")).status(404)
            }else{
                res.send(sendResponse(true,null,"Deleted Successfully")).status(200)
            }
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
    // res.send("Delete Student Data")
})
// ----------------------


// EXPORT
module.exports = route;