console.log("Arquivo dashboard.js foi carregado com sucesso!");

// --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
const formSaida = document.querySelector('#form-saida');
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


 // TABELA HISTORICO DE COMPRAS
 
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



const pagamentosDoMes = transacoesDoMesAtual.filter(transaction => {
    return transaction.type === 'expense' &&
           transaction.paymentMethod !== 'debito' &&
           transaction.paymentMethod !== 'pix';
});


listaPagamentosMensais.innerHTML = ''; 

if (pagamentosDoMes.length > 0) {
    pagamentosDoMes.forEach(pagamento => {
        const listItemHTML = `
            <li>
                <span class="pagamento-nome">${pagamento.name}</span>
                <span class="pagamento-valor">${formatCurrency(pagamento.amount)}</span>
                <span class="pagamento-info">${pagamento.installmentInfo || ''}</span>
            </li>
        `;
        listaPagamentosMensais.innerHTML += listItemHTML;
    });
} else {
    listaPagamentosMensais.innerHTML = '<li class="sem-pagamentos">Nenhum pagamento recorrente este mês.</li>';
}};



// CODIGOS DE EVENT LISTENERS

// FORM SAIDA

formSaida.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.querySelector('#name-saida').value;
    const data = document.querySelector('#data-saida').value;
    const valorString = document.querySelector('#valor-saida').value;
    const formaPagamento = document.querySelector('#forma-pagamento-saida').value;

    const valorCorrigido = valorString.replace(',', '.');

    const valorNumerico = parseFloat(valorCorrigido);

    if (!nome || !data || !valorString || !formaPagamento) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const newTransaction = { id: new Date().getTime(), name: nome, date: data, amount: valorNumerico, paymentMethod: formaPagamento, type: 'expense' };
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
              name: nome,
              date: dataFormatadaParaSalvar,
              amount: valorDasParcelas,
              paymentMethod: "credito",
              type: 'expense',
              installmentInfo: `${i}/${numeroTotalDeParcelas}`,
        };
        
        addTransaction(newTransaction);
    }

    updateUI();
    formParcelamento.reset();
    document.querySelector('#modal-parcelamento').close();
})

// FORM ASSINATURAS

formAssinatura.addEventListener('submit', (event) => {
    event.preventDefault();

    const nomeAssinatura = document.querySelector('#nome-assinatura').value;
    const dataInicio = document.querySelector('#data-assinatura').value;
    const valorString = document.querySelector('#valor-assinatura').value;
    const tipoCobranca = document.querySelector('#tipo-cobranca').value;

    if (!nomeAssinatura || !dataInicio || !valorString || !tipoCobranca) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const valor = parseFloat(valorString.replace(',', '.'));
    const dataBase = new Date(dataInicio + "T00:00:00");
    let numeroDeMeses;
    
    if (tipoCobranca === 'trimestral') {
        numeroDeMeses = 3;
    } else if (tipoCobranca === 'semestral') {
        numeroDeMeses = 6;
    } else if (tipoCobranca === 'anual') {
        numeroDeMeses = 12;
    } else {
        numeroDeMeses = 12;
    }

    const valorDaMensalidade = (tipoCobranca === 'anual') ? valor / numeroDeMeses : valor;

    for (let i = 1; i <= numeroDeMeses; i++) {
        const dataDaParcela = new Date(dataBase);
        dataDaParcela.setMonth(dataBase.getMonth() + (i - 1));
        const dataFormatadaParaSalvar = `${dataDaParcela.getFullYear()}-${String(dataDaParcela.getMonth() + 1).padStart(2, '0')}-${String(dataDaParcela.getDate()).padStart(2, '0')}`;
        
        const nomePersonalizado = (tipoCobranca !== 'mensal')
            ? `${nomeAssinatura} (${i}/${numeroDeMeses})` 
            : nomeAssinatura;

        const newTransaction = {
            id: new Date().getTime() + i,
            name: nomePersonalizado,
            date: dataFormatadaParaSalvar,
            amount: valorDaMensalidade,
            paymentMethod: "recorrente",
            type: 'expense'
        };

        console.log('Assinatura/Parcela criada:', newTransaction);
        addTransaction(newTransaction);
    }
    
    updateUI();
    formAssinatura.reset();
    document.querySelector('#modal-assinatura').close();
});
// ATUALIZAÇÃO DA LISTA DE PAGAMENTOS MENSAIS (a ser implementada)
// A lógica para preencher a #pagamentos-mensais viria aqui...


updateUI();