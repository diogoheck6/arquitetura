import { Express } from 'express'
import RegistrarUsuario from '../core/usuario/RegistrarUsuario'

export default class RegistrarUsuarioController {
	constructor(
		private servidor: Express,
		private casoDeUso: RegistrarUsuario
	) {
		servidor.post('/registrar', async (req, res) => {
			try {
				await casoDeUso.executar(
					req.body.nome,
					req.body.email,
					req.body.senha
				)
				res.status(201).send()
			} catch (err: any) {
				res.status(400).send(err.message)
			}
		})
	}
}
