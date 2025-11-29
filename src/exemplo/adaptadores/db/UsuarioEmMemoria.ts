import ColecaoUsuario from '../../app/usuario/ColecaoUsuario'
import Usuario from '../../app/usuario/Usuario'

export default class UsuarioEmMemoria implements ColecaoUsuario {
	private static itens: Usuario[] = []

	async inserir(item: Usuario): Promise<void> {
		UsuarioEmMemoria.itens.push(item)
	}
}
