const dotenv = require("dotenv").config({path:`${__dirname}/.env`})

const mariadb = require("mariadb")
const client = mariadb.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    port:process.env.DATABASE_PORT,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    multipleStatements:true,
})

async function sqlc(query) {
    return new Promise((resolve, reject) => {
        client.query(query).then(result => {
            resolve(Array.from(result))
        }).catch(err => reject(err))
    }) 
}

const knex = require("knex")({
    client:"mysql2",
    connection:{
        host:process.env.HOST,
        user:process.env.USER,
        port:process.env.DATABASE_PORT,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE_NAME,
        multipleStatements:true,
    }
})


module.exports = {
    raw: async (query) => {
        return await sqlc(query)
    },
    knex
}