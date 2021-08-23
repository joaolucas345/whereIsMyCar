const express = require("express")
const app = express()

app.get("/" , (req,res) => {
    res.send('Hey, world from car route!!!')
})

module.exports = app