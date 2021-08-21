const express = require("express")
const app = express.Router()
const controller = require("../controllers/userController")
const db = require("../database/database")


app.get("/:username" , controller.read)
app.put("/" , controller.create)
app.post("/" , controller.update)
app.delete("/" , controller.delete)


module.exports = app