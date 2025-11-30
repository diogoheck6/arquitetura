import dotenv from 'dotenv'
dotenv.config()

import ColecaoUsuarioDB from './adapters/db/knex/ColecaoUsuarioDB'
import BcryptAdapter from './adapters/auth/BcryptAdapter'
import express from 'express'
import LoginUsuario from './core/usuario/LoginUsuario'
import LoginUsuarioController from './controllers/LoginUsuarioController'
import RegistrarUsuario from './core/usuario/RegistrarUsuario'
import RegistrarUsuarioController from './controllers/RegistrarUsuarioController'
import JwtAdapter from './adapters/auth/JwtAdaptar'
import SalvarTransacao from './core/transacao/SalvarTransacao'
import SalvarTransacaoController from './controllers/SalvarTransacaoController'
import UsuarioMiddleware from './controllers/UsuarioMiddleware'

const app = express()
const porta = process.env.PORTA ?? 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(porta, () => {
	console.log(`🔥 Servidor rodando na porta ${porta}`)
})

// -------------------------------- Rotas Abertas

const provedorToken = new JwtAdapter(process.env.JWT_SECRET!)
const provedorCripto = new BcryptAdapter()
const colecaoUsuario = new ColecaoUsuarioDB()

const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto)
const loginUsuario = new LoginUsuario(
	colecaoUsuario,
	provedorCripto,
	provedorToken
)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

// -------------------------------- Rotas Autenticadas
const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, provedorToken)

const salvarTransacao = new SalvarTransacao()
new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware)
