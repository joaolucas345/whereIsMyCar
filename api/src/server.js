require("dotenv").config({path:`${__dirname}/.env`})
const express = require("express")
const app = express()
const sqlc = require("../database/sql")
const console = require("../utils/logger")
const userRouter = require("../routes/user")
const carRouter = require("../routes/car")
const authenticationRouter = require("../routes/authentication")


app.use(express.json())

app.use("/user" , userRouter)
app.use("/car" , carRouter)
app.use("/authentication" , authenticationRouter)

app.listen(3001 , () => {
    console.log("🚀 server started in port 3001")
})