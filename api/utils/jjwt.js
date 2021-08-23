const crypto = require("crypto")

class jjwt
{
    constructor()
    {
        this.key = crypto.randomBytes(32)
        this.iv = crypto.randomBytes(16)
    }
    register(key = crypto.randomBytes(32) , iv = crypto.randomBytes(16))
    {
        let str = key
        if(str.length !== 32){
            if(str.length < 32){
                while(str.length < 32){
                    str += str
                }
                key = str.substring(str.length - 32, str.length)
            }
            if(str.length > 32){
                key = str.substring(str.length - 32, str.length)
            }
        }
        str = iv
        if(str.length !== 16){
            if(str.length < 16){
                while(str.length < 16){
                    str += str
                }
                iv = str.substring(str.length - 16, str.length)
            }
            if(str.length > 16){
                iv = str.substring(str.length - 16, str.length)
            }
        }

        this.key = new Buffer.from(key)
        this.iv =  new Buffer.from(iv)
        return [key.toString("hex") , iv.toString("hex")]
    }
    createCookie(user = {} , time = "3035-03-25T12:00:00-06:30")
    {
        try{
            if(typeof(user) != "object") throw "Invalid type, type must be json"
            const cyp = crypto.createCipheriv("aes-256-cbc" , new Buffer.from(this.key) , this.iv)
            const stringified = JSON.stringify(user)
            let output = cyp.update(`${stringified}&${time}`)//add time later
            output = Buffer.concat([output , cyp.final()])
            return `${output.toString("hex")}`
        }catch(err){
            return err
        }
    }
    getCookie(cookie)
    {
        try{
            const iv =  new Buffer.from(this.iv , "hex")
            const cyp = crypto.createDecipheriv("aes-256-cbc" , new Buffer.from(this.key) , iv)
            const text = new Buffer.from(cookie , "hex")
            let output = cyp.update(text)
            output += new Buffer.concat([output , cyp.final()])
            const [parsed, parsedTwo , date] = output.split("&")
            if(new Date(date) < new Date()) return undefined
            return JSON.parse(parsed)
        }catch(err){
            return err
        }
    }
}
const dotenv = require("dotenv").config({path: `${__dirname}/../.env`})
const PasswordManager = new jjwt()
PasswordManager.register(process.env.JJWT_KEY , process.env.JJWT_IV)

module.exports = PasswordManager
