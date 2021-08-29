const bcrypt = require("bcrypt")
const getId = require("../getId")
module.exports = [
    {
        name:"getUser",
        callback: async (runner , arg) => {
            const user_id = await getId(arg[0] , arg[1] , runner)
            const users = await runner(`SELECT * FROM users WHERE id="${user_id}"`)
            return users
        }
   },
   {
       name:"createUser",
       callback: async (runner , arg) => {
            const [username , password , description] = arg
            const hashedPassword = await bcrypt.hash(password , 10)
            try{
                await runner(`INSERT INTO users(username , password, description) VALUE ("${username}" , "${hashedPassword}" , "${description}")`)
                return "success"
            }catch(err){
                return "error"
            }

        }
   },
   {
       name:"updateUser",
       callback:async (runner , arg) => {
            let [column , value , username] = arg
            if(column == "password") value = await bcrypt.hash(value  , 10)
            const response = await runner(`UPDATE users SET ${column}='${value}' WHERE username='${username}'`)
        } 
   },
   {
       name:"deleteUser",
       callback:async (runner , arg) => {
            const userid = await getId(arg[0] , null , runner, true)
            await runner(`DELETE FROM users WHERE id=${userid}`)
            await runner(`DELETE FROM car WHERE user_id=${userid}`)
       }
   }
]