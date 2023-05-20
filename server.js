// npm init then ENTER ENTER ....
// npm i express
// Server bar bar chalana par rha tha ab islye hum nodemon download krngy
// script main change krngy
// npm i dotenv
// npm i mongoose
// npm init -y (Testing/Jaldi k lye)

//Imports
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
// ROUTER IMPORTS
const TeacherRouter = require("./Routes/teacherRouter")
const StudentRouter = require("./Routes/studentRouter")
const InstituteRouter = require("./Routes/instituteRouter")
// Use Middle Ware
const app = express()
app.use(express.json());


app.use('/api/studentRouter', StudentRouter)
app.use('/api/instituteRouter', InstituteRouter)
app.use('/api/teacherRouter', TeacherRouter)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("DATA BASE CONNECTED && Server is Listening on 5000 port")
    })
}).catch((err)=>{
    console.log(err)
})