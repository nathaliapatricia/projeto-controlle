let transactions = [];

/**
* @param {object} transaction
*/

function addTransaction(transaction) {
    transactions.unshift(transaction);
    console.log('Transações atuais:', transactions);
}

/** Calcula a soma das transações que são 'income'
* @returns {numbers}
*/

function calculateTotalIncome() {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((summ, t) => summ + t.amount, 0);
}

/** Calcula a soma das transações que são 'expense'
 * @returns {numbers}
 */

function calculateTotalExpense() {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((summ, t) => summ + t.amount, 0);
}

/** Calcula o saldo final
 * @returns {numbers}
 */

function calculateBalance() {
    const hoje = new Date();

    const transacoesAteHoje = transactions.filter(transaction =>{
        const dataDaTransacao = new Date(transaction.date + "T00:00:00");
        return dataDaTransacao <= hoje;
    });

     const totalIncome = transacoesAteHoje
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transacoesAteHoje
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return totalIncome - totalExpense;

}