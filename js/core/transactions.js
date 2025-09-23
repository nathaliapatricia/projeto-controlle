// Nosso "banco de dados" temporário.
// É um array que vai guardar objetos, onde cada objeto é uma transação.

let transactions = [];

// Função para adicionar uma nova transação
function addTransaction(transactions) {
    // Adiciona a nova transação no início do array para aparecer primeiro na lista
    transactions.unshift(transaction);
    console.log('Transações atuais:', transactions);
}

// Funções para calcular os totais
function calculateTotalIncome() {
    return transactions
        .filter(t => t.type === 'income') // Filtra apenas as entradas
        .reduce ((summ, t) => sum + t.amount, 0); // Soma os valores
}

function calculateTotalExpense() {
    return transactions
    .filter(t => t.type === 'expense') // Filtra apenas as saídas
    .reduce((summ, t) => summ + t.amount, 0); // Soma os valores
}

function calculateTotalBalance() {
    return calculateTotalIncome() - calculateTotalExpense();
}