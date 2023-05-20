//IMPORT
const express = require("express");
const TeacherModel = require("../models/teacherModel");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

// GET DATA
route.get('/', async (req, res) => {
    try{
        const result = await TeacherModel.find()
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            res.send(sendResponse(true,result)).status(200)
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
    // res.send("Get Teachers Data")
})
// ----------------------
// GET DATA BY SPECIFIC ID
route.get('/:id', (req, res) => {
    res.send("Get Single Teacher Data")
})
// ----------------------
// POST DATA
route.post('/', async (req, res) => {
    let {Name,Contact,Course} = req.body
    try{
        let ErrArr = []
        if(!Name){
            ErrArr.push("Required Name")
        }if(!Contact){
            ErrArr.push("Required Contact")
        }if(!Course){
            ErrArr.push("Required Course")
        }
        if(ErrArr.length>0){
            res.send(sendResponse(false,null,"Required Data",ErrArr))
        }    else{
            let obj = {Name,Contact,Course}
            const TeacherData = new TeacherModel(obj)
            await TeacherData.save()
            if(!TeacherData){
                res.send(sendResponse(false,null,"Internal server Error")).status(400)
            }else{
                res.send(sendResponse(true,TeacherData,"Saved Successfully")).status(200)
            }
        }
    }
    catch(err){
        res.send(sendResponse(false,null,"Internal server Error",err)).status(400)

    }
    // res.send("Post Teacher Data")
})
// ----------------------
// PUT DATA
route.put('/:id', (req, res) => {
    res.send("Edit Teacher Data")
})
// ----------------------

// DELETE DATA
route.delete('/:id', (req, res) => {
    res.send("Delete Teacher Data")
})
// ----------------------


// EXPORT
module.exports = route;