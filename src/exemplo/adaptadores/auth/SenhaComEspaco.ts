import ProvedorCriptografia from "../../app/portas/ProvedorCriptografia"

export default class SenhaComEspaco implements ProvedorCriptografia {
	criptografar(senha: string): string {
		return senha.split("").join(" ")
	}
}
