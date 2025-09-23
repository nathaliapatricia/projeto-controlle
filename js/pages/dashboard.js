const formSaida = document.querySelector('#form-saida');
const formEntrada = document.querySelector('#form-entrada');
const formParcelas = document.querySelector('#form-parcelas');
const formAssinatura = document.querySelector('#form-assinatura');

//DASHBOARD
const totalEntradasEl = document.querySelector('#total-entradas')
const totalSaidasEl = document.querySelector('#total-saidas')
const totalSaldoEl = document.querySelector('#total-saldo')

// TABELAS
const tabelaCompras = document.querySelector('#tabela-compras')
const listaPagamentoMensais = document.querySelector('#pagamentos-mensais')

// --- FUNÇÃO PRINCIPAL PARA ATUALIZAR A TELA ---
// Centraliza toda a lógica de renderização

function uptadeUI(){
    
    const hoje = new Date();
    const mesAtual = hoje.getMonth() +1;
    const anoAtual = hoje.getFullYear();

    const transacoesDoMesAtual = transactions.filter(transaction => {
        const dataDaTransacao = new Date(transactions.date + "T00:00:00");
        const mesDaTrasacao = dataDaTransacao.getFullMonth() + 1;
        const anoDaTransacao = dataDaTransacao.getFullYear();

        return mesDaTransacao === mesAtual && anoDaTransacao === anoAtual;
    })

    // Calcular as ENTRADAS de acordo com o mês atual.
    const monthlyIncome = transacoesDoMesAtual
        .filter (t => t.type === 'income')
        .reduce ((summ, t) => summ + t.amount, 0);

    const monthlyExpense = transacoesDoMesAtual
        .filter (t => t.type === 'expense')
        .reduce ((summ, t) => summ + t.amount, 0);

    // CALCULO DO SALDO GERAL USANDO TODOS OS VALORES QUE ENTROU
    const totalBalance = calculateBalance();
    
    totalEntradasEl.textContent = formatCurrency(monthlyIncome);
    totalSaidasEl.textContent = formatCurrency(monthlyExpense);
    totalSaidasEl.textContent = formatCurrent (totalBalance);

    transacoesDoMesAtual.forEach(transaction => {
        const newRowHTML = `
        <tr>
            <td>${transaction.name}</td>
            <td>${formatDate(transaction.date)}</td>
            <td>${formatCurrency(transaction.amount)}</td>
            <td>${transaction.type === 'income' ? 'Entrada' : transaction.paymentMethod}</td>
        </tr> `;

        tabelaComprasBody.innerHTML += newRowHTML;

    });

    formSaida.addEventListener('submit', (event) => {
        event.preventDefault();
        const nome = document.querySelector('#nome-saida'). value;
        const data = document.querySelector('#data-saida'). value;
        const valor = document.querySelector('#valor-saida'). value;
        const formaPagamento = document.querySelector('#forma-pagamento'). value;
        if (!nome || !data || !valor || !formaPagamento) {
            alert('Por favor, preencha todos os campos!');
            return;

        }

        const newTransaction = {id: new Date().getTime(), name: nome, date: data, amount: parseFloat(valor), paymentMethod: formaPagamento, type: 'expense'};
        addTransaction(newTransaction);
        uptadeUI();
        formSaida.reset();
        document.querySelector('#modal-saida').close();
    });


}