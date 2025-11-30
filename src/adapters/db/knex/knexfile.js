const dotenv = require('dotenv')
dotenv.config({ path: '../../../../.env' })

console.log('DB_URL NO KNEXFILE:', process.env.DB_URL)

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
