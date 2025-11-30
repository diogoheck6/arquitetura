import UsuarioEmMemoria from '../src/adaptadores/db/UsuarioEmMemoria'
import CriptoReal from '../src/adaptadores/auth/CriptoReal'
import InverterSenha from '../src/adaptadores/auth/InverterSenha'
import RegistrarUsuario from '../src/core/usuario/RegistrarUsuario'
import SenhaComEspaco from '../src/adaptadores/auth/SenhaComEspaco'
import ColecaoUsuarioDB from '../src/adaptadores/db/knex/ColecaoUsuarioDB'

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
