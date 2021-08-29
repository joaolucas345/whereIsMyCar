require("dotenv").config({path:`${__dirname}/.env`})
const express = require("express")
require("express-async-errors")
const app = express()
const console = require("../utils/logger")
const userRouter = require("../routes/user")
const carRouter = require("../routes/car")
const {AuthenticationRoute} = require("../routes/authentication")
const path = require("path")
const cors = require("cors")

app.use((err, req, res, next) => {
    if (err.message === 'access denied') {
      res.status(403);
      res.json({ error: err.message });
    }
   
    next(err);
  });

app.use(cors({
    credentials:true,
    origin:"http://localhost:3001",
    methods:["GET" , "DELETE" , "PUT" , "POST"]
}))
app.use(express.json())
app.use("/" , express.static(path.join(__dirname , ".." , ".." , "public")))
app.use("/user" , userRouter)
app.use("/car" , carRouter)
app.use("/authentication" , AuthenticationRoute)



app.listen(3001 , () => {
    console.log(`🚀 server started in port 3001. Serving  ${path.join(__dirname , ".." , ".." , "public")} `)
})