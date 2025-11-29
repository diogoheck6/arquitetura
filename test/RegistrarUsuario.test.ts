import BancoEmMemoria from "../src/BancoEmMemoria"
import Colecao from "../src/Colecao"
import RegistrarUsuario from "../src/RegistrarUsuario"

test("Deve registrar um usuário", () => {
	const colecao: Colecao = new BancoEmMemoria()
	const casoDeUso = new RegistrarUsuario(colecao)
	const usuario = casoDeUso.executar("João da Silva da Silva", "jjjoao@zmail.com.br", "123456")

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
})
