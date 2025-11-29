import UsuarioEmMemoria from '../src/exemplo/adaptadores/db/UsuarioEmMemoria'
import CriptoReal from '../src/exemplo/adaptadores/auth/CriptoReal'
import InverterSenha from '../src/exemplo/adaptadores/auth/InverterSenha'
import RegistrarUsuario from '../src/exemplo/app/usuario/RegistrarUsuario'
import SenhaComEspaco from '../src/exemplo/adaptadores/auth/SenhaComEspaco'
import ColecaoUsuarioDB from '../src/exemplo/adaptadores/db/knex/ColecaoUsuarioDB'

import path from 'path'
import dotenv from 'dotenv'

// Carrega o .env da raiz do projeto
dotenv.config({
	path: path.resolve(__dirname, '../.env'),
})

console.log('DB_URL NO TESTE:', process.env.DB_URL)

test('Deve registrar um usuário invertendo a senha', () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new InverterSenha()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(usuario.senha).toBe('654321')
})

test('Deve registrar um usuário com senha com espaços', () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new SenhaComEspaco()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(usuario.senha).toBe('1 2 3 4 5 6')
})

test('Deve registrar um usuário com senha criptografada', () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new CriptoReal()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(provedorCripto.comparar('123456', usuario.senha!)).toBeTruthy()
})

test.skip('Deve registrar um usuário no banco real', () => {
	const colecao = new ColecaoUsuarioDB()
	const provedorCripto = new CriptoReal()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

	const usuario = casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	console.log('DB_URL NO TESTE:', process.env.DB_URL)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(provedorCripto.comparar('123456', usuario.senha!)).toBeTruthy()
})
