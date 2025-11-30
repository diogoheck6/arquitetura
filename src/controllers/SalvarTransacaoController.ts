import { Express, Request, Response } from 'express'
import SalvarTransacao from '../core/transacao/SalvarTransacao'

export default class SalvarTransacaoController {
	constructor(private servidor: Express, private casoDeUso: SalvarTransacao) {
		const fn = async (req: Request, res: Response) => {
			try {
				const resposta = await this.casoDeUso.executar()
				res.status(200).json(resposta)
			} catch (err: any) {
				res.status(400).send(err.message)
			}
		}
		servidor.post('/transacao', fn)
	}
}
