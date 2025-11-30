import usuarios from '../data/usuarios'
import axios from 'axios'

const baseURL = process.env.API_URL

export async function getAutorizationHeader() {
	const resp = await axios.post(`${baseURL}/login`, usuarios.completo)
	return {
		headers: {
			Authorization: `Bearer ${resp.data.token}`,
		},
	}
}
