import ProvedorCriptografia from '../../core/usuario/ProvedorCriptografia'
import bcript from 'bcrypt'

export default class CriptoReal implements ProvedorCriptografia {
	criptografar(senha: string): string {
		const salt = bcript.genSaltSync(10)
		return bcript.hashSync(senha, salt)
	}
	comparar(senha: string, senhaCriptografada: string): boolean {
		return bcript.compareSync(senha, senhaCriptografada)
	}
}
