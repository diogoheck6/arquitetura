import UsuarioEmMemoria from '../src/exemplo/adaptadores/db/UsuarioEmMemoria'
import CriptoReal from '../src/exemplo/adaptadores/auth/CriptoReal'
import InverterSenha from '../src/exemplo/adaptadores/auth/InverterSenha'
import RegistrarUsuario from '../src/exemplo/app/usuario/RegistrarUsuario'
import SenhaComEspaco from '../src/exemplo/adaptadores/auth/SenhaComEspaco'
import ColecaoUsuarioDB from '../src/exemplo/adaptadores/db/knex/ColecaoUsuarioDB'

// import path from 'path'
// import dotenv from 'dotenv'

// // Carrega o .env da raiz do projeto
// dotenv.config({
// 	path: path.resolve(__dirname, '../.env'),
// })

// console.log('DB_URL NO TESTE:', process.env.DB_URL)

test('Deve registrar um usuário invertendo a senha', async () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new InverterSenha()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = await casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(usuario.senha).toBe('654321')
})

test('Deve registrar um usuário com senha com espaços', async () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new SenhaComEspaco()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = await casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(usuario.senha).toBe('1 2 3 4 5 6')
})

test('Deve registrar um usuário com senha criptografada', async () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new CriptoReal()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = await casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(provedorCripto.comparar('123456', usuario.senha!)).toBeTruthy()
})

test('Deve registrar erro ao cadastrar um usuário já cadastrado', async () => {
	const colecao = new UsuarioEmMemoria()
	const provedorCripto = new CriptoReal()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

	const nome = 'João da Silva da Silva'
	const email = 'jjjoao@zmail.com.br'
	const senha = '123456'

	await casoDeUso.executar(nome, email, senha)
	const exe = async () => await casoDeUso.executar(nome, email, senha)

	await expect(exe).rejects.toThrow('Usuário já existe.')
})

test.skip('Deve registrar um usuário no banco real', async () => {
	const colecao = new ColecaoUsuarioDB()
	const provedorCripto = new CriptoReal()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)

	const usuario = await casoDeUso.executar(
		'João da Silva da Silva',
		'jjjoao@zmail.com.br',
		'123456'
	)

	console.log('DB_URL NO TESTE:', process.env.DB_URL)

	expect(usuario).toHaveProperty('id')
	expect(usuario.nome).toBe('João da Silva da Silva')
	expect(provedorCripto.comparar('123456', usuario.senha!)).toBeTruthy()
})
