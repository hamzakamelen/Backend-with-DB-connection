//IMPORT
const express = require("express")
const StudentModel = require("../models/studentModel");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

// GET DATA
route.get('/',async (req,res)=>{
    try{
        const result = await StudentModel.find()
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found"))
            .status(404);
        }else{
            res.send(sendResponse(true,result))
            .status(200);
        }
    }catch(err){
        console.log(err)
        res.send(sendResponse(false,null,"Internal server Error")).status(400);
    }
    // res.send("Get All Students Data")
})
// ----------------------
// GET DATA BY SPECIFIC ID
route.get('/:id',  (req, res) => {
    res.send("Get Single Student Data")
 })
// ----------------------
// POST DATA
route.post('/', async (req, res) => {
    let {firstName,LastName,contact,Course, password , Email} = req.body
    try{

        let errArr = []
        if(!firstName){
            errArr.push("Required : FirstName")
        }
        if(!Email){
            errArr.push("Required : FirstName")
        }
        if(!password){
            errArr.push("Required : FirstName")
        }
        if(!contact){
            errArr.push("Required : Contact")
        } if(!Course){
            errArr.push("Required : Course")
        } 
        if(errArr.length>0){
            res.send(false,null,"Required",errArr)
        }else{
            let obj = {firstName,LastName,Email,password,contact,Course};
            let student = new StudentModel(obj)
            await student.save()
            if(!student){
                res.send(sendResponse(false,null,"Internal Server Error")).status(400)
            }else{
                res.send(sendResponse(true,student,"Saved Succesfully")).status(200)
            }
        }
    }  
    catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(404)
    }
    // res.send("Post Student Data")
 })
// ----------------------
// PUT DATA
route.put('/:id', (req, res) => {
    res.send("Edit Students Data")
 })
// ----------------------

// DELETE DATA
route.delete('/:id', (req, res) => { 
    res.send("Delete Student Data")
})
// ----------------------


// EXPORT
module.exports=route;