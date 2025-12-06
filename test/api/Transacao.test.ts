import axios from 'axios'
import { getAutorizationHeader } from '../util/auth'
import transacoes from '../data/transacoes'

const baseURL = process.env.API_URL

test('Deve registrar um novo usuáro se não existir', async () => {
	try {
		const headers = await getAutorizationHeader()
		const resp = await axios.post(
			`${baseURL}/transacao`,
			transacoes.semId,
			headers
		)
		expect(resp.status).toBe(200)
	} catch (e: any) {
		console.log(e.response.data)
		expect(e.response.status).toBe(400)
	}
})

test('Deve popular com uma lista de transações', async () => {
	try {
		const headers = await getAutorizationHeader()
		const respostas = transacoes.lista.map(async transacao => {
			const resp = await axios.post(
				`${baseURL}/transacao`,
				transacao,
				headers
			)
			return resp.status
		})
		const listaDeStatus = await Promise.all(respostas)
		expect(listaDeStatus.every(s => s === 200)).toBe(true)
	} catch (e: any) {
		console.log(e.response.data)
		expect(e.response.status).toBe(400)
	}
})

test('Deve retornar o extrato mensal + saldo consolidado', async () => {
	try {
		const headers = await getAutorizationHeader()
		const resp = await axios.get(`${baseURL}/extrato/2025/12`, headers)
		console.log(resp.data)
		expect(resp.status).toBe(200)
		expect(resp.data).toHaveProperty('transacoes')
		expect(resp.data).toHaveProperty('saldo')
	} catch (e: any) {
		console.log(e.response.data)
		expect(e.response.status).toBe(400)
	}
})
