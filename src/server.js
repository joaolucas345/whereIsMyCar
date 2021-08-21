const express = require("express")
const app = express()

//routes
const user = require("./routes/user")

app.use(express.json())

app.use("/user" , user)

app.listen(3001)