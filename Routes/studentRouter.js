//IMPORT
const express = require("express")
const StudentModel = require("../models/studentModel");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

// GET DATA
route.get('/', async (req, res) => {
    try {
        const result = await StudentModel.find()
        if (!result) {
            res.send(sendResponse(false, null, "Data Not Found"))
                .status(404);
        } else {
            res.send(sendResponse(true, result))
                .status(200);
        }
    } catch (err) {
        console.log(err)
        res.send(sendResponse(false, null, "Internal server Error")).status(400);
    }
    // res.send("Get All Students Data")
})
// ----------------------




// GET DATA BY SPECIFIC ID
route.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const result = await StudentModel.findById(id)
        if (!result) {
            res.send(sendResponse(false, null, "Data Not Found"))
                .status(404);
        } else {
            res.send(sendResponse(true, result))
                .status(200);
        }
    } catch (err) {
        console.log(err)
        res.send(sendResponse(false, null, "Internal server Error")).status(400);
    }
    // res.send("Get Single Student Data")
})
// ----------------------



// POST DATA
route.post('/', async (req, res) => {
    let { firstName, LastName, contact, Course, password, Email } = req.body
    try {

        let errArr = []
        if (!firstName) {
            errArr.push("Required : FirstName")
        }
        if (!Email) {
            errArr.push("Required : FirstName")
        }
        if (!password) {
            errArr.push("Required : FirstName")
        }
        if (!contact) {
            errArr.push("Required : Contact")
        } if (!Course) {
            errArr.push("Required : Course")
        }
        if (errArr.length > 0) {
            res.send(false, null, "Required", errArr)
        } else {
            let obj = { firstName, LastName, Email, password, contact, Course };
            let student = new StudentModel(obj)
            await student.save()
            if (!student) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(400)
            } else {
                res.send(sendResponse(true, student, "Saved Succesfully")).status(200)
            }
        }
    }
    catch (err) {
        res.send(sendResponse(false, null, "Internal Server Error", err)).status(404)
    }
    // res.send("Post Student Data")
})
// ----------------------



// Edit/PUT DATA
route.put('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let result = await StudentModel.findById(id)
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400)
        } else {
            let updateResult = await StudentModel.findByIdAndUpdate(id, req.body,
                { new: true })
            if (!updateResult) {
                res.send(sendResponse(false, null, "Error")).status(400)
            } else {
                res.send(sendResponse(true, updateResult, "Updated Successfully")).status(200)
            }
        }
    } catch (err) {
        res.send(sendResponse(false, null, "Error")).status(404)
    }

    // res.send("Edit Students Data")
})
// ----------------------

// DELETE DATA
route.delete('/:id', async (req, res) => {
    try {

        let id = req.params.id
        let result = await StudentModel.findById(id)
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this id")).status(404)
        } else {
            let deleteResult = StudentModel.findByIdAndDelete(id)
            if (!deleteResult) {
                res.send(sendResponse(false, null, "ERror")).status(400)
            } else {
                res.send(sendResponse(true, null, "Deleted Successfully")).status(200)
            }
        }
    } catch {
        res.send(sendResponse(false, null, "Error")).status(404)

    }
    // res.send("Delete Student Data")
})
// ----------------------

// SEARCH API
route.get("/search", async (req, res) => {
    try{
        let { firstName } = req.body
        if (firstName) {
            let rESULT = await StudentModel.find({firstName})
            if (!rESULT) {
                res.send(sendResponse(false, null, "No Name Found")).status(404)
            } else {
                res.send(sendResponse(true, rESULT)).status(404)
            }
        }else{
            res.send(sendResponse(false,null,"INternal Error")).status(400)
        }
    }catch(err){
        console.log('Error ======>',err)
        res.send(sendResponse(false,null,"INternal Error",err)).status(404)
    }
})
//SEARCH MULTIPLE
// route.get("/searchfull", async (req, res) => {
//     let { firstName, LastName } = req.body
//     if (firstName && LastName) {
//         let result = await StudentModel.find({ firstName: firstName, LastName: LastName })
//         if (!result) {
//             res.send(sendResponse(false, null, "No Name Found")).status(404)
//         } else {
//             res.send(sendResponse(true, result)).status(404)
//         }
//     }
// })
// EXPORT
module.exports = route;