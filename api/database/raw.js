const mariadb = require("mariadb").createPool({
    user:"root",
    password:"<password>",
    database:"carloc",
    port: 3306,
    host: "localhost",
    multipleStatements:true
})


module.exports = (query = "query") =>
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