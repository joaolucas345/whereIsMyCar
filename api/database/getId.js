const bcrypt = require("bcrypt")

module.exports = async (username , password , runner, dontNeedPassword) => {
    const users = await runner(`SELECT * FROM users WHERE username = "${username}"`)
    if(dontNeedPassword) return users[0].id
    for(let y = 0 ; y < users.length ; y++){
        const isIt = await bcrypt.compare(password , users[y].password)
        if(isIt) return users[y].id
    }
    return -1
}