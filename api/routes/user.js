const express = require("express")
const app = express.Router()
const database = require("../database/sql")
const errorHandler = require("../utils/errorHandler")


//change from usernam to id if possible


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