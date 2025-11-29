import ProvedorCriptografia from "./ProvedorCriptografia"

export default class InverterSenha implements ProvedorCriptografia {
	criptografar(senha: string): string {
		return senha.split("").reverse().join("")
	}
}
