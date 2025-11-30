import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import RegistrarUsuarioController from './controllers/RegistrarUsuarioController'
import RegistrarUsuario from './core/usuario/RegistrarUsuario'
import ColecaoUsuarioDB from './adapters/db/knex/ColecaoUsuarioDB'
import CriptoReal from './adapters/auth/CriptoReal'

const app = express()
const porta = process.env.PORTA ?? 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(porta, () => {
	console.log(`🔥 Servidor rodando na porta ${porta}`)
})

// -------------------------------- Rotas Abertas

const provedorCripto = new CriptoReal()
const colecaoUsuarioDB = new ColecaoUsuarioDB()
const registrarUsuario = new RegistrarUsuario(colecaoUsuarioDB, provedorCripto)
new RegistrarUsuarioController(app, registrarUsuario)

// -------------------------------- Rotas Autenticadas
