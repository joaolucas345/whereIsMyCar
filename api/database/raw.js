const mariadb = require("mariadb").createPool({
    user:"root",
    password:"140507",
    database:"carloc",
    port: 3307,
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