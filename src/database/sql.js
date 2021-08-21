const db = require("./database")

/*
	id serial primary key
	username --255,
	password: hash, 

*/

const main = async () => {
	console.log(await db.raw(`SELECT * FROM users ;`))
	process.exit()
}
main()
