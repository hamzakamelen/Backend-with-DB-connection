// npm init then ENTER ENTER ....
// npm i express
// npm init -y (Testing/Jaldi k lye)
require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

// ROUTER IMPORTS
const TeacherRouter = require("./Routes/teacherRouter")
const StudentRouter = require("./Routes/studentRouter")
const InstituteRouter = require("./Routes/instituteRouter")

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("DATA BASE CONNECTED && Server is Listening on 5000 port")
    })
}).catch((err)=>{
    console.log(err)
})


app.use('/api/studentRouter', StudentRouter)
app.use('/api/instituteRouter', InstituteRouter)
app.use('/api/teacherRouter', TeacherRouter)



// Server bar bar chal rha tha ab islye hum nodemon download krngy
// script main change krngy
// npm i dotenv
// npm i mongoose
