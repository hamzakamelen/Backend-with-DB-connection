//IMPORT
const express = require("express")
const route = express.Router();

// GET DATA
route.get('/', (req, res) => {
    res.send("Get Teachers Data")
})
// ----------------------
// GET DATA BY SPECIFIC ID
route.get('/:id', (req, res) => {
    res.send("Get Single Teacher Data")
})
// ----------------------
// POST DATA
route.post('/', (req, res) => {
    res.send("Post Teacher Data")
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