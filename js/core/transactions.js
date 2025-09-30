let transactions = [];

/**
 * Adiciona um novo objeto de transação ao início do array 'transactions'.
 * @param {object} transaction - O objeto da nova transação.
 */
function addTransaction(transaction) {
    transactions.unshift(transaction);
    console.log('Transações atuais:', transactions);
}

/**
 * Calcula a soma de TODAS as transações do tipo 'income' no array.
 * @returns {number} - O total de entradas.
 */
function calculateTotalIncome() {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calcula a soma de TODAS as transações do tipo 'expense' no array.
 * @returns {number} - O total de saídas.
 */
function calculateTotalExpense() {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * CALCULA O SALDO DE CAIXA ATUAL (CASH FLOW)
 * Considera apenas as transações com data ANTERIOR ou IGUAL a hoje.
 * @returns {number} - O saldo total até a data atual.
 */
function calculateBalance() {
    // 1. Pega a data de hoje.
    const hoje = new Date();

    // 2. Filtra o array principal para criar uma lista temporária apenas com
    //    transações que já aconteceram (data <= hoje).
    const transacoesAteHoje = transactions.filter(transaction => {
        const dataDaTransacao = new Date(transaction.date + "T00:00:00");
        return dataDaTransacao <= hoje;
    });

    // 3. Calcula as entradas e saídas SÓ com base nesse histórico filtrado.
    const totalIncomeAteHoje = transacoesAteHoje
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenseAteHoje = transacoesAteHoje
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // 4. Retorna o saldo correto.
    return totalIncomeAteHoje - totalExpenseAteHoje;
}

// FUNÇÃO PARA EXCLUIR TRANSAÇÃO
function excluirTransacao(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    salvarTransacoes()
    updateUI();
}