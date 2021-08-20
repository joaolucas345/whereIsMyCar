const express = require("express")
const app = express.Router()
const console = require("../utils/logger")
const db = require("../database/database")

app.get("/" , async (req,res) => {
    const users = await db.raw("SELECT * FROM users")
    console.log(`logged all users at ${new Date().toUTCString()}`)
    res.json(users)
})

module.exports = app