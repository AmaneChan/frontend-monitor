import mysql from 'mysql'

const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'admin123',
	database: 'db_database',
})

export default db
