import CasoDeUso from '../shared/CasoDeUso'
import ColecaoUsuario from './ColecaoUsuario'
import ProvedorCriptografia from './ProvedorCriptografia'
import Usuario from './Usuario'

export type Entrada = { email: string; senha: string }
export type Saida = { usuario: Usuario; token: string }

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia
	) {}

	async executar(dto: Entrada): Promise<Saida> {
		const usuarioExistente = await this.colecao.buscarPorEmail(dto.email)
		if (!usuarioExistente) throw new Error('Usuário não existe.')

		const mesmaSenha = this.provedorCripto.comparar(
			dto.senha,
			usuarioExistente.senha!
		)
		if (!mesmaSenha) throw new Error('Senha incorreta.')
		return {
			usuario: { ...usuarioExistente, senha: undefined },
			token: 'token-fake',
		}
	}
}
