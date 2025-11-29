// src/exemplo/adaptadores/db/knex/knexfile.js (ajusta extensão se for .ts)
const path = require('path')
const dotenv = require('dotenv')

// Carrega o .env SEM depender do cwd
dotenv.config({
	path: path.resolve(__dirname, '../../../../../.env'),
})

console.log('DB_URL no knexfile:', process.env.DB_URL)

module.exports = {
	client: 'pg',
	connection: process.env.DB_URL,
	migrations: {
		tableName: 'knex_migrations',
	},
	pool: {
		min: 2,
		max: 10,
	},
}
