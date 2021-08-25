const express = require("express")
const app = express.Router()
const errorHandler = require("../utils/errorHandler")
const database = require("../database/sql")
const jwt = require("jsonwebtoken")

app.use((req,res,next) => {
    const cookieJSON = {}
    const cookie = req.headers.cookie.split("; ")
    cookie.map(cookie => {
        const areas = cookie.split("=")
        cookieJSON[areas[0]] = areas[1]
    })
    req.cookie = cookieJSON
    next()
})



async function Login(user , res)
{
    if(!user.username) return null
    const cookie = jwt.sign(user , process.env.JWT_KEY , {expiresIn:"200d"})
    res.writeHead(200 , {"Set-Cookie":`ssid_cookie=${cookie}`})
    return true
}

app.post("/login" , async (req , res) => {
    try{    
        const {user} = req.body
        if(!user) return res.send("no user passed in")
        const {username, description} = ((await database("getUser" , [user]).then(p => p.length > 0 ? p[0] : p)))
        //purification
        await Login({username , description} , res)
        res.end()
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.post("/register" , async (req,res) => {
    try{   
        const {username , password, description} = req.body
        if(!username || !password) return res.status(400).send("missing something")
        await database("createUser", [username , password, description]).catch(() => {
                throw "database error"
        })
        const user = (await database("getUser" , [username]).then(p => p[0]))
        await Login({username:user.username , description:user.description} , res)
        res.end()
    }catch(err){
        errorHandler(res, err.message)
    }
})
module.exports = app