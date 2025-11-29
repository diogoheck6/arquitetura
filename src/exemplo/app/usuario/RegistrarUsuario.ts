import ProvedorCriptografia from './ProvedorCriptografia'
import ColecaoUsuario from './ColecaoUsuario'
import Usuario from './Usuario'
import Id from '../shared/Id'

export default class RegistrarUsuario {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia
	) {}

	async executar(
		nome: string,
		email: string,
		senha: string
	): Promise<Usuario> {
		const senhaCripto = this.provedorCripto.criptografar(senha)

		const usuarioExistente = await this.colecao.buscarPorEmail(email)
		if (usuarioExistente) throw new Error('Usuário já existe.')

		const usuario: Usuario = {
			id: Id.gerar(),
			nome,
			email,
			senha: senhaCripto,
		}

		this.colecao.inserir(usuario)
		return usuario
	}
}
