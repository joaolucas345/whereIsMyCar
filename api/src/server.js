const express = require("express")
const app = express()
const sqlc = require("../database/sql")
const console = require("../utils/logger")
const userRouter = require("../routes/user")
const carRouter = require("../routes/car")

app.use(express.json())

app.use("/user" , userRouter)
app.use("/car" , carRouter)

app.listen(3001 , () => {
    console.log("🚀 server started in port 3001")
})