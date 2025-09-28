let transactions = [];

function addTransaction(transaction) {
    transactions.unshift(transaction);
    salvarTransacoes();
    console.log('Transações atuais:', transactions);
}

function calculateTotalIncome() {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((summ, t) => summ + t.amount, 0);
}

function calculateTotalExpense() {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((summ, t) => summ + t.amount, 0);
}

// FUNÇÃO PARA EXCLUIR TRANSAÇÃO
function excluirTransacao(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    salvarTransacoes()
    updateUI();
}