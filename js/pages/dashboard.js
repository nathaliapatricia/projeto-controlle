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
    // 1. Atualiza os cards de totais
    const totalIncome = calculateTotalIncome();
    const totalExpense = calculateTotalExpense();
    const totalBalance = calculateTotalBalance();

    totalEntradasEl.textContent = formatCurrency(totalIncome);
    totalSaidasEl.textContent = formatCurrency(totalExpense);
    totalSaldoEl.textContent = formatCurrency(totalBalance);

    
}