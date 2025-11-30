import { Express } from 'express'
import RegistrarUsuario from '../core/usuario/RegistrarUsuario'

export default class RegistrarUsuarioController {
	constructor(
		private servidor: Express,
		private registrarUsuario: RegistrarUsuario
	) {
		servidor.post('/registrar', async (req, res) => {
			await registrarUsuario.executar(
				req.body.nome,
				req.body.email,
				req.body.senha
			)
			res.status(201).send()
		})
	}
}
