console.log("Arquivo dashboard.js foi carregado com sucesso!");

// --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
const formSaida = document.querySelector('#form-saida');
console.log('Elemento formSaida encontrado pelo JS:', formSaida);
const formEntrada = document.querySelector('#form-entrada');

const formParcelamento = document.querySelector('#form-parcelas');
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

// CODIGOS DE EVENT LISTENERS

// FORM SAIDA

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

// FORM ENTRADA

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

// FORM PARCELAMENTOS

formParcelamento.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.querySelector('#nome-parcelas').value;
    const data = document.querySelector('#data-parcelas').value;
    const valorTotal = document.querySelector('#valor-parcelas').value;
    const numeroDeParcelas = document.querySelector('#parcelas').value;

    if (!nome || !data || !valorTotal || !numeroDeParcelas) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const valorDasParcelas = parseFloat(valorTotal) / parseInt(numeroDeParcelas);
    const numeroTotalDeParcelas = parseInt(numeroDeParcelas);
    const dataBase = new Date(data + "T00:00:00");


    for (let i = 1; i <= numeroDeParcelas; i++) {
        const dataDaParcela = new Date(dataBase)
        dataDaParcela.setMonth(dataBase.getMonth() + (i - 1));

        const ano = dataDaParcela.getFullYear();
        const mes = String(dataDaParcela.getMonth() + 1).padStart(2, '0');
        const dia = String(dataDaParcela.getDate()).padStart(2, '0');

        const dataFormatadaParaSalvar = `${ano}-${mes}-${dia}`;
        console.log(`Data da Parcela ${i}: ${dataFormatadaParaSalvar}`);
        const nomePersonalizado = `${nome} (${i}/${numeroDeParcelas})`;

        const newTransaction = {
              id: new Date().getTime() + i,
              name: nomePersonalizado,
              date: dataFormatadaParaSalvar,
              amount: valorDasParcelas,
              paymentMethod: "credito",
              type: 'expense'
        };
        
        addTransaction(newTransaction);
    }

    updateUI();
    formParcelamento.reset();
    document.querySelector('#modal-parcelamento').close();
})




updateUI();