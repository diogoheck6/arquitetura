import RegistrarUsuario from "../src/RegistrarUsuario"

test("Deve registrar um usuário", () => {
	const casoDeUso = new RegistrarUsuario()
	const usuario = casoDeUso.executar("João da Silva da Silva", "jjjoao@zmail.com.br", "123456")

	expect(usuario).toHaveProperty("id")
	expect(usuario.nome).toBe("João da Silva da Silva")
})
