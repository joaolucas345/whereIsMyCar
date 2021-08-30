const express = require("express")
const app = express.Router()
const errorHandler = require("../utils/errorHandler")
const database = require("../database/sql")
const jwt = require("jsonwebtoken")

app.use((req,res,next) => {
    try{
        const cookieJSON = {}
        const cookie = req.headers.cookie?.split("; ")
        cookie?.map(cookie => {
            const areas = cookie.split("=")
            cookieJSON[areas[0]] = areas[1]
        })
        req.cookie = cookieJSON
        if(req.cookie.ssid_cookie) {
            const isMyJWT = jwt.verify(req.cookie.ssid_cookie , process.env.JWT_KEY)
            const userToAsing = {}
            Object.entries(isMyJWT).map(key => {
                if(key[0] != "iat" && key[0] != "exp"){
                    userToAsing[key[0]] = key[1]
                }
            })
            req.user = userToAsing
        }
    }catch(err){}
    next()
})



async function Login(user , res)
{
    if(!user.username) return null
    const cookie = jwt.sign(user , process.env.JWT_KEY , {expiresIn:"200d"});
    const date = (new Date(new Date().setFullYear(2022)).toUTCString())
    res.writeHead(200 , {"Set-Cookie":`ssid_cookie=${cookie}; expires=${date}; path=/`})
    return true
}

app.post("/login" , async (req , res) => {
    try{    
        const { usernamefromuser , password} = req.body
        if(!usernamefromuser || !password) return res.send("missing something")
        const {username, description} = ((await database("getUser" , [usernamefromuser , password]).then(p => p.length > 0 ? p[0] : p)))
        //purification
        if(username) await Login({username , description} , res)
        if(!username) res.write("error")
        res.end()
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.post("/register" , async (req,res) => {//s
    try{   
        const {username , password, description} = req.body
        if(!username || !password) return res.status(400).send("missing something")
        const userCreateRequestState = await database("createUser", [username , password, description]).catch((e) => {
                throw {message:"database error"}
        })
        if(userCreateRequestState === "success"){
            const user = (await database("getUser" , [username , password]).then(p => p[0]))
            await Login({username:user.username , description:user.description} , res)    
            res.end()
        }else{
            res.write(userCreateRequestState)
            res.end()
        }
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.get("/user" , async (req,res) => {
    res.json({username: req.user?.username})
})
module.exports = {AuthenticationRoute:app , login:Login}