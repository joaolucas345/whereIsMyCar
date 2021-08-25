module.exports = [
    {
        name:"getUser",
        callback: async (runner , arg) => {
            const users = await runner(`SELECT * FROM users WHERE username="${arg[0]}"`)
            return users
        }
   },
   {
       name:"createUser",
       callback: async (runner , arg) => {
           const [username , password , description] = arg
           await runner(`INSERT INTO users(username , password, description) VALUE ("${username}" , "${password}" , "${description}")`)
       }
   },
   {
       name:"updateUser",
       callback:async (runner , arg) => {
            const [column , value , old] = arg
            const response = await runner(`UPDATE users SET ${column}='${value}' WHERE username='${old}'`)
        } 
   },
   {
       name:"deleteUser",
       callback:async (runner , arg) => {
           const [user] = arg
           await runner(`DELETE FROM users WHERE username="${user}"`)
       }
   }
]