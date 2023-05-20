//IMPORT
const express = require("express")

const route = express.Router();

// GET DATA
route.get('/',(req,res)=>{
    res.send("Get All Students Data")
})
// ----------------------
// GET DATA BY SPECIFIC ID
route.get('/:id', (req, res) => {
    res.send("Get Single Student Data")
 })
// ----------------------
// POST DATA
route.post('/', (req, res) => {
    res.send("Post Student Data")
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