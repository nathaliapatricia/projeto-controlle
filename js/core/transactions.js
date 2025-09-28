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


  // FUNÇÃO PARA EXLCUIR TRANSAÇÃO

// FUNÇÃO PARA EXCLUIR TRANSAÇÃO
function excluirTransacao(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI(); // Esta função agora vai funcionar
}

function editarTransacao(id) {
  const transaction = transactios.fint(t => t.id === id);

  if (!transaction) {
    alert("Transação não encontrada.");
    return;
  }

  console.log('Editando Transação:', transacation);

  if (transaction.type === 'income') {
      editarEntrada(transaction);
  } else {
    editarSaida(transaction);
  }
}

// FUNÇÃO PARA EDITAR ENTRADA
function editarEntrada(transacation) {
  document.querySelector('#name-entrada').value = transacation.name;
  document.querySelector('#data-entrada').value = transacation.date;
  document.querySelector('#valor-entrada').value = transaction.amount;

  const modal = document.querySelector('#modal-entrada');
  modal.showModal();

  modal.setAttribute('data-editing-id', transacation.id);
}

// FUNÇÃO PARA EDITAR SAÍDA

function editarSaida(transacation) {
  document.querySelector('#name-saida').value = transacation.name;
  document.querySelector('#data-saida').value = transacation.date;
  document.querySelector('#valor-saida').value = transacation.amount;
  document.querySelector('#forma-de-pagamento').value = transacation.paymentMethod;

  const modal = document.querySelector('#modal-saida');

  modal.showModal();
  modal.setAttribute('data-editing-id', transacation.id);

}
