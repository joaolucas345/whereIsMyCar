const express = require("express")
const app = express()
const database = require("../database/sql")
const errorHandler = require("../utils/errorHandler")
const encrypter = require("../utils/jjwt")
const jwt = require("jsonwebtoken")

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

app.get("/" , async (req,res) => {
    try{
        const cars = await database("getCar" , [req.user?.username])
        cars.forEach(car => car.pos = JSON.stringify(encrypter.getCookie(car.pos)))
        cars.forEach(car => {
            car.id = null
            car.user_id = null
        })
        res.send(cars)
    }catch(err){
        errorHandler(res , err.message)
    }
})

app.put("/" , async (req,res) => {
    try{
        let {position , carname} = req.body
        position = encrypter.createCookie(JSON.parse(position))
        await database("createCar" , [position , carname , req.user?.username])
        res.send("car created")
    }catch(err){
        errorHandler(res , err.message)
    }
})

app.post("/" , async (req,res) => {
    try{
        let {column , carname , value} = req.body
        if(column == "pos") value = encrypter.createCookie(JSON.parse(value))
        await database("updateCar" , [column , carname , value , req.user?.username])
        res.send("car updated")
    }catch(err){
        errorHandler(res , err.message)
    }
})

app.delete("/" , async (req,res) => {
    try{
        await database("deleteCar" , [req.user?.username , req.body.carname])
        res.send("car deleted")
    }catch(err){
        errorHandler(res , err.message)
    }
})

module.exports = app