exports.up = async function (knex) {
	const existe = await knex.schema.hasTable('usuario')
	if (existe) return

	return knex.schema.createTable('usuarios', (tabela) => {
		tabela.uuid('id').primary()
		tabela.string('nome').notNullable()
		tabela.string('email').notNullable().unique()
		tabela.string('senha').notNullable()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('usuario')
}
