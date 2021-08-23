const fs = require("fs")
const dirPath = `${__dirname}/queries`
const fileDIR = fs.readdirSync(dirPath)

const mariadb = require("mariadb").createPool({
    user:"root",
    password:"140507",
    database:"carloc",
    port: 3307,
    host: "localhost",
    multipleStatements:true
})

//script
let sqlScripts = [],
    script = ""
    
fileDIR.forEach((filename) => {
    try{
        script = require(`${dirPath}/${filename}`)
        script.forEach(code => sqlScripts[code.name] = code)
    }catch(err){
        console.error(err.message)
    }
})

function raw(query = "query")
{
    return new Promise(async (resolve, reject) => {   
        mariadb.query(query)
                .then(value => {
                    resolve(Array.from(value))
                })
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
    })
}

module.exports = async (functionName =  "yourSQLFunction", args = []) => {
    const queryResponse = await sqlScripts[functionName].callback(raw , args)
    return queryResponse
}   