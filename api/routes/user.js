const express = require("express")
const app = express.Router()
const database = require("../database/sql")
const errorHandler = require("../utils/errorHandler")


app.get("/" , async (req,res) => {
    try{    
        const user = await database("getUser")
        res.send(user)
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.put("/" , async (req,res) => {
    try{   
        const {username , password, description} = req.body
        await database("createUser", [username , password, description]).catch(() => {
                throw "database error"
        })
        res.send(`created at ${new Date()}`)
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.post("/" , async (req,res) => {
    try{   
        const {value , old , column} = req.body
            await database("updateUser", [column , value , old]).catch(() => {
                throw "database error"
        })
        res.send(`update at ${new Date()}`)
    }catch(err){
        errorHandler(res, err.message)
    }
})

app.delete("/" , async (req,res) => {
    try{   
        const {user} = req.body
            await database("deleteUser", [user]).catch(() => {
                throw "database error"
        })
        res.send(`deleted at ${new Date()}`)
    }catch(err){
        errorHandler(res, err.message)
    }
})

module.exports = app