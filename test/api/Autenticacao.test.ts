import axios from 'axios'
import Usuario from '../../src/core/usuario/Usuario'

const baseURL = process.env.API_URL
const usuario: Partial<Usuario> = {
	nome: 'Maria da Silva',
	email: 'mmmaria@zgmail.com',
	senha: '123456',
}

test('Deve registrar um novo usuáro se não existir', async () => {
	try {
		const resp = await axios.post(`${baseURL}/registrar`, usuario)
		expect(resp.status).toBe(201)
	} catch (e: any) {
		expect(e.response.status).toBe(400)
		expect(e.response.data).toBe('Usuário já existe.')
	}
})

test('Deve logar com email e senha corretos', async () => {
	const resp = await axios.post(`${baseURL}/login`, {
		email: usuario.email,
		senha: usuario.senha,
	})
	expect(resp.status).toBe(200)
	expect(resp.data.nome).toBe('Maria da Silva')
	expect(resp.data.email).toBe(usuario.email)
})
