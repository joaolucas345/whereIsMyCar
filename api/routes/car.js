const express = require("express")
const app = express()
const database = require("../database/sql")
const errorHandler = require("../utils/errorHandler")
const encrypter = require("../utils/jjwt")




app.get("/" , async (req,res) => {
    try{
        const cars = await database("getCar")
        cars.forEach(car => car.pos = JSON.stringify(encrypter.getCookie(car.pos)))
        res.send(cars)
    }catch(err){
        errorHandler(res , err.message)
    }
})

app.put("/" , async (req,res) => {
    try{
        let {position , carname} = req.body
        position = encrypter.createCookie(JSON.parse(position))
        await database("createCar" , [position , carname])
        res.send("car created")
    }catch(err){
        errorHandler(res , err.message)
    }
})

app.post("/" , async (req,res) => {
    try{
        let {column , old , value} = req.body
        if(column == "pos") value = encrypter.createCookie(JSON.parse(value))
        await database("updateCar" , [column , old , value])
        res.send("car updated")
    }catch(err){
        errorHandler(res , err.message)
    }
})

app.delete("/" , async (req,res) => {
    try{
        const {user} = req.body
        await database("deleteCar" , [user])
        res.send("car deleted")
    }catch(err){
        errorHandler(res , err.message)
    }
})

module.exports = app