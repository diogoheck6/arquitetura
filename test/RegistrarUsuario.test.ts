import BancoEmMemoria from "../src/exemplo/adaptadores/db/BancoEmMemoria"
import CriptoReal from "../src/exemplo/adaptadores/auth/CriptoReal"
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha"
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario"
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco"

test("Deve registrar um usuário invertendo a senha", () => {
	const colecao = new BancoEmMemoria()
	const provedorCripto = new InverterSenha()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar(
		"João da Silva da Silva",
		"jjjoao@zmail.com.br",
		"123456"
	)

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
	expect(usuario.senha).toBe("654321")
})

test("Deve registrar um usuário com senha com espaços", () => {
	const colecao = new BancoEmMemoria()
	const provedorCripto = new SenhaComEspaco()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar(
		"João da Silva da Silva",
		"jjjoao@zmail.com.br",
		"123456"
	)

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
	expect(usuario.senha).toBe("1 2 3 4 5 6")
})

test("Deve registrar um usuário com senha criptografada", () => {
	const colecao = new BancoEmMemoria()
	const provedorCripto = new CriptoReal()
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
	const usuario = casoDeUso.executar(
		"João da Silva da Silva",
		"jjjoao@zmail.com.br",
		"123456"
	)

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
	expect(provedorCripto.comparar("123456", usuario.senha)).toBeTruthy()
})
