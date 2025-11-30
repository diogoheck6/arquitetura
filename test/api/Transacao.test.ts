import axios from 'axios'
import { getAutorizationHeader } from '../util/auth'

const baseURL = process.env.API_URL

test('Deve registrar um novo usuáro se não existir', async () => {
	const headers = await getAutorizationHeader()
	const resp = await axios.post(`${baseURL}/transacao`, {}, headers)
	expect(resp.status).toBe(200)
})
