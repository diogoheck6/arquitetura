import ProvedorCriptografia from './ProvedorCriptografia'
import ColecaoUsuario from './ColecaoUsuario'
import Usuario from './Usuario'

export default class RegistrarUsuario {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia
	) {}

	executar(nome: string, email: string, senha: string): Usuario {
		const senhaCripto = this.provedorCripto.criptografar(senha)

		const usuario: Usuario = {
			id: `${Math.random()}`,
			nome,
			email,
			senha: senhaCripto,
		}

		this.colecao.inserir(usuario)
		return usuario
	}
}
