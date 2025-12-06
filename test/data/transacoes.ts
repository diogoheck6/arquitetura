import Transacao from '../../src/core/transacao/Transacao'

// export default {
// 	semId: {
// 		descricao: 'Conta de luz',
// 		valor: -100,
// 		vencimento: new Date('2021-01-01'),
// 		idUsuario: '88805765-d524-48a7-9b59-bf55329f89a0',
// 	} as Transacao,
// }

const transacaoRef = {
	descricao: 'Conta de luz',
	valor: -100,
	vencimento: new Date('2025-12-06'),
	idUsuario: '88805765-d524-48a7-9b59-bf55329f89a0',
} as Transacao

export default {
	semId: transacaoRef,
	lista: [
		{ ...transacaoRef, valor: 5000, descricao: 'Salário' },
		{ ...transacaoRef, valor: -450, descricao: 'Conta de luz' },
		{ ...transacaoRef, valor: -100, descricao: 'Conta de água' },
		{ ...transacaoRef, valor: -250, descricao: 'Conta de telefone' },
	],
}
