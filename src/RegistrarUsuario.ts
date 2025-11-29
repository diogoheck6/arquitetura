import Colecao from "./Colecao"
import InverterSenha from "./InverterSenha"

export default class RegistrarUsuario {
	private inverterSenha = new InverterSenha()

	constructor(private colecao: Colecao) {}

	executar(nome: string, email: string, senha: string) {
		const senhaCripto = this.inverterSenha.criptografar(senha)

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
