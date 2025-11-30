import dotenv from 'dotenv'
dotenv.config()

import ColecaoUsuarioDB from './adapters/db/knex/ColecaoUsuarioDB'
import CriptoReal from './adapters/auth/CriptoReal'
import express from 'express'
import LoginUsuario from './core/usuario/LoginUsuario'
import LoginUsuarioController from './controllers/LoginUsuarioController'
import RegistrarUsuario from './core/usuario/RegistrarUsuario'
import RegistrarUsuarioController from './controllers/RegistrarUsuarioController'

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
const loginUsuario = new LoginUsuario(colecaoUsuarioDB, provedorCripto)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

// -------------------------------- Rotas Autenticadas
