console.log("Arquivo dashboard.js foi carregado com sucesso!");

// --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
const formSaida = document.querySelector('#form-saida');
console.log('Elemento formSaida encontrado pelo JS:', formSaida);
const formEntrada = document.querySelector('#form-entrada');

const formParcelamento = document.querySelector('#form-parcelamento');
const formAssinatura = document.querySelector('#form-assinatura');

// DASHBOARD
const totalEntradasEl = document.querySelector('#total-entradas');
const totalSaidasEl = document.querySelector('#total-saidas');
const totalSaldoEl = document.querySelector('#total-saldo');

// TABELAS
const tabelaComprasBody = document.querySelector('#tabela-compras');
const listaPagamentosMensais = document.querySelector('#pagamentos-mensais');


// --- 2. FUNÇÕES PRINCIPAIS ---

function updateUI() {
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    const transacoesDoMesAtual = transactions.filter(transaction => {
        const dataDaTransacao = new Date(transaction.date + "T00:00:00");
        const mesDaTransacao = dataDaTransacao.getMonth() + 1;
        const anoDaTransacao = dataDaTransacao.getFullYear();

        return mesDaTransacao === mesAtual && anoDaTransacao === anoAtual;
    });

    const monthlyIncome = transacoesDoMesAtual
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpense = transacoesDoMesAtual
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = calculateBalance();

    totalEntradasEl.textContent = formatCurrency(monthlyIncome);
    totalSaidasEl.textContent = formatCurrency(monthlyExpense);
    totalSaldoEl.textContent = formatCurrency(totalBalance);

    tabelaComprasBody.innerHTML = '';

    transacoesDoMesAtual.forEach(transaction => {
        const newRowHTML = `
            <tr>
                <td>${transaction.name}</td>
                <td>${formatDate(transaction.date)}</td>
                <td>${formatCurrency(transaction.amount)}</td>
                <td>${transaction.type === 'income' ? 'Entrada' : transaction.paymentMethod}</td>
            </tr>
        `;
        tabelaComprasBody.innerHTML += newRowHTML;
    });
}

formSaida.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.querySelector('#name-saida').value;
    const data = document.querySelector('#data-saida').value;
    const valor = document.querySelector('#valor-saida').value;
    const formaPagamento = document.querySelector('#forma-pagamento-saida').value;

    if (!nome || !data || !valor || !formaPagamento) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const newTransaction = { id: new Date().getTime(), name: nome, date: data, amount: parseFloat(valor), paymentMethod: formaPagamento, type: 'expense' };
    addTransaction(newTransaction);

    
    updateUI();
    formSaida.reset();
    document.querySelector('#modal-saida').close();
});

formEntrada.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.querySelector('#name-entrada').value;
    const data = document.querySelector('#data-entrada').value;
    const valor = document.querySelector('#valor-entrada').value;

    if (!nome || !data || !valor) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const newTransaction = {id: new Date().getTime(),
                            name: nome,
                            date: data,
                            amount: parseFloat(valor),
                            type: 'income'
                            };  
    addTransaction(newTransaction);

    updateUI();
    formEntrada.reset();
    document.querySelector('#modal-entrada').close();
    
});



updateUI();