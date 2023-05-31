const express = require('express')
const { sendResponse } = require("../helper/helper");
const UserModel = require('../models/UserModel');
const route = express.Router()
// npm i bcrypt
const bcrypt = require('bcrypt')
// route.get('/')

// Signup
route.post('/signup',async(req,res)=>{
    const {userName,email,password} = req.body
    const obj = {userName,email,password};
    let ReqArr = ["userName","email","password"];
    let errArr = [];
    ReqArr.forEach((x)=>{
        if(!obj[x]){
            errArr.push(x)
        }
    });
    if(errArr.length>0){
        res.send(sendResponse(false,null,"Please Filled Required Fields First",errArr)).status(400);
    }else{
        let hashPassword = await bcrypt.hash(obj.password,10);
        obj.password = hashPassword;

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            res.send(sendResponse(false,null,"Email Already Exist")).status(401)
        }else{
            // Dusra Tareeqa Post krny ka
             UserModel.create(obj)
                .then((result)=>{
                    res.send(sendResponse(true,result,"User Saved Successfully")).status(200)
                }) .catch((err)=>{
                    res.send(sendResponse(false,err,"Internal Server Error")).status(400)
                    })
        }
    }
})

// Login
route.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const obj = {email,password}
    //validation khud krni h
    let ReqArr = ["email","password"];
    let errArr = [];
    ReqArr.forEach((x)=>{
        if(!obj[x]){
            errArr.push(x)
        }
    });
    if(errArr.length>0){
        res.send(sendResponse(false,null,"Please Filled Required Fields First",errArr)).status(400);
    }else{
    UserModel.findOne({email}).then(async(user)=>{
       let isConfirm = await bcrypt.compare(obj.password,user.password)
    //    console.log(isConfirm)
       if(isConfirm){
           res.send(sendResponse(true,user,'Login SuccessFul'));
        }else{
           res.send(sendResponse(false,null,'Credential Error'));
       }
    }).catch((err)=>{
        res.send(sendResponse(false,err,"User Doesn't Exist"))
    })
}
})
// route.post('/')
// route.put('/')
// route.delete('/')

module.exports = route;