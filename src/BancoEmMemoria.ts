export default class BancoEmMemoria {
	private static itens: any[] = []

	inserir(item: any) {
		BancoEmMemoria.itens.push(item)
		return item
	}
}
