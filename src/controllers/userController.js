const db = require("../database/database")

module.exports = {
    create: async (req,res) => {
        const {username , password} = req.body
        if(typeof(username) != "string" || typeof(password) != "string") return res.status(406).send("Wrong type in body")
        try{
            await db.raw(`INSERT INTO users (username, password ) VALUES ('${username}' , '${password}')`)
            res.status(200).send(`created at ${new Date}`)
        }catch(err){
            if(err.message.toLowerCase().includes("duplicate entry")){
                res.status(403).send("user already exist")
            }else{
                res.status(500).send(err.message)
            }
        }
    },
    read:async (req,res) => {
        if((typeof(parseInt(req.params.username)) != "number")) return res.status(403).send()
        let users
        try{
            users = await db.raw(`SELECT * FROM users WHERE username = '${req.params.username}'`)
        }catch(err){
            res.status(500).send(err.message)
        }
        res.json(users)
    },
    update:async (req,res) => {
        // input, value
        const {field , value , username} = req.body
        if(typeof(field) !== "string" || typeof(value) !== "string" || typeof(username) !== "string") return res.status(406).send("Wrong type in body or missing a propertie")
        try{
            await db.raw(`UPDATE users SET ${field} = '${value}' WHERE username = '${username}'`)
            res.send(`updated at ${new Date()}`)
        }catch(err){
            res.status(500).send(err.message)
        }
    },  
    delete:async (req,res) => {
        const {username} = req.body 
        if(typeof(username) != "string") return res.status(403).send("Wrong type in body or missing a property")
        try{
            await db.raw(`DELETE FROM users WHERE username = '${username}'`)
            res.send(`deleted at ${new Date()}`)
        }catch(err){
            res.status(500).send(err.message)
        }
    }
}