import BancoEmMemoria from "./BancoEmMemoria"
import InverterSenha from "./InverterSenha"

export default class RegistrarUsuario {
	private banco = new BancoEmMemoria()
	private inverterSenha = new InverterSenha()

	executar(nome: string, email: string, senha: string) {
		const senhaCripto = this.inverterSenha.criptografar(senha)

		const usuario = {
			id: Math.random(),
			nome,
			email,
			senha: senhaCripto,
		}

		this.banco.inserir(usuario)
		return usuario
	}
}
