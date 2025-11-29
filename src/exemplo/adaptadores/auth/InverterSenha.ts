import ProvedorCriptografia from "../../app/portas/ProvedorCriptografia"

export default class InverterSenha implements ProvedorCriptografia {
	criptografar(senha: string): string {
		return senha.split("").reverse().join("")
	}
}
