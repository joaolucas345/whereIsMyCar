const db = require("./database")

const main = async () => {
	console.log(await db.raw(`INSERT INTO users(username) VALUES ("joao"); SELECT * FROM users;`))
	process.exit()
}
main()
