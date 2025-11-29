import ColecaoUsuario from '../../../app/usuario/ColecaoUsuario'
import conexao from './conexao'
import Usuario from '../../../app/usuario/Usuario'

export default class ColecaoUsuarioDB implements ColecaoUsuario {
	async inserir(usuario: Usuario): Promise<void> {
		await conexao.table('usuarios').insert(usuario)
	}
}
