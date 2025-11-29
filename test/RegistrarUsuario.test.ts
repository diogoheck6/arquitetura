import BancoEmMemoria from "../src/BancoEmMemoria"
import RegistrarUsuario from "../src/RegistrarUsuario"
import InverterSenha from "../src/InverterSenha"
import SenhaComEspaco from "../src/SenhaComEspaco"

test("Deve registrar um usuário invertendo a senha", () => {
	const colecao = new BancoEmMemoria()
	const provedorCripto = new InverterSenha()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar("João da Silva da Silva", "jjjoao@zmail.com.br", "123456")

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
	expect(usuario.senha).toBe("654321")
})

test("Deve registrar um usuário com senha com espaços", () => {
	const colecao = new BancoEmMemoria()
	const provedorCripto = new SenhaComEspaco()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar("João da Silva da Silva", "jjjoao@zmail.com.br", "123456")

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
	expect(usuario.senha).toBe("1 2 3 4 5 6")
})
