const express = require("express")
const app = express.Router()
const database = require("../database/sql")
const errorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const {login} = require("./authentication")


app.use((req,res,next) => {
    try{
        const cookieJSON = {}
        const cookie = req.headers.cookie?.split("; ") ? req.headers.cookie?.split("; ") : cookie = req.headers.cookie  
        Array.isArray(cookie) ? cookie.map(cookie => {
            const areas = cookie.split("=")
            cookieJSON[areas[0]] = areas[1]
        }) : () => {
            const areas = cookie.split("=")
            cookieJSON[areas[0]] = areas[1]
        }
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

//change from usernam to id if possible

app.use((req,res,next) => {
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
    next()
})


app.post("/" , async (req,res) => {
    try{   
        const {value , column} = req.body
        const username = req.user?.username
            await database("updateUser", [column , value , username]).catch(() => {
                throw "database error"
        })
        if(column == "username"){
            console.log(value , " <= new username")
            login({username:value} , res)
            res.end()
        }else{
            res.send("updated")
        }
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.delete("/" , async (req,res) => {
    try{   
        await database("deleteUser", [req.user?.username]).catch(() => {
                throw "database error"
        })
        res.send(`deleted at ${new Date()}`)
    }catch(err){
        errorHandler(res, err.message)
    }
})

module.exports = app









// app.get("/:username" , async (req,res) => {
//     try{    
//         const {username, description} = (await database("getUser" , [req.params.username]).then(p => p[0]))
//         //purification
//         res.send({username, description})
//     }catch(err){
//         errorHandler(res, err.message)
//     }
// })

// app.put("/" , async (req,res) => {
//     try{   
//         const {username , password, description} = req.body
//         if(!username || !password) return res.status(400).send("missing something")
//         await database("createUser", [username , password, description]).catch(() => {
//                 throw "database error"
//         })
//         res.send(`created at ${new Date()}`)
//     }catch(err){
//         errorHandler(res, err.message)
//     }
// })