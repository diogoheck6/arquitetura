import Colecao from "./Colecao"
import ProvedorCriptografia from "./ProvedorCriptografia"

export default class RegistrarUsuario {
	constructor(private colecao: Colecao, private provedorCripto: ProvedorCriptografia) {}

	executar(nome: string, email: string, senha: string) {
		const senhaCripto = this.provedorCripto.criptografar(senha)

		const usuario = {
			id: Math.random(),
			nome,
			email,
			senha: senhaCripto,
		}

		this.colecao.inserir(usuario)
		return usuario
	}
}
