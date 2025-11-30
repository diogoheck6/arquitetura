import axios from 'axios'

const baseURL = process.env.API_URL

test('Deve registrar um novo usuáro se não existir', async () => {
	const resp = await axios.post(`${baseURL}/transacao`)
	console.log(resp.data)
	expect(resp.status).toBe(200)
})
