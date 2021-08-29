const fs = require("fs")
const dirPath = `${__dirname}/queries`
const raw = require("./raw")
const fileDIR = fs.readdirSync(dirPath)


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

module.exports = async (functionName =  "yourSQLFunction", args = []) => {
    const queryResponse = await sqlScripts[functionName].callback(raw , args)
    return queryResponse
}   