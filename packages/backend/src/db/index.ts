import mysql from 'mysql'

const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'monitor',
})

export default db
