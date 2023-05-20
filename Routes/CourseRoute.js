const express = require("express")
const CourseModel = require("../models/CourseModel")
const { sendResponse } = require("../helper/helper")
const route =  express.Router()


route.get('/', async (req, res) => {
    try{
        const result = await CourseModel.find()
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            res.send(sendResponse(true,result)).status(200)
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
})

route.get('/:id',(req,res)=>{

})
route.post('/', async (req, res) => {
    let {Name,Duration,Fees,ShortName} = req.body
    try{
        let ErrArr = []
        if(!Name){
            ErrArr.push("Required Name")
        }if(!Duration){
            ErrArr.push("Required Duration")
        }if(!Fees){
            ErrArr.push("Required Fees")
        }
        if(!ShortName){
            ErrArr.push("Required ShortName")
        }
        if(ErrArr.length>0){
            res.send(sendResponse(false,null,"Required Data",ErrArr))
        }    else{
            let obj = {Name,Duration,Fees,ShortName}
            const Courses = new CourseModel(obj)
            await Courses.save()
            if(!Courses){
                res.send(sendResponse(false,null,"Internal server Error")).status(400)
            }else{
                res.send(sendResponse(true,Courses,"Saved Successfully")).status(200)
            }
        }
    }
    catch(err){
        res.send(sendResponse(false,null,"Internal server Error",err)).status(400)

    }
})
route.put('/:id', (req, res) => { })
route.delete('/:id', (req, res) => { })

module.exports=route