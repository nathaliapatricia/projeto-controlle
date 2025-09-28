function salvarTransacoes() {
    try {
        const transacoesJSON = JSON.stringify(transactions);
        localStorage.setItem('controlle-transactions', transacoesJSON);
        console.log('Transações salvas no localStorage');
    } catch (error) {
        console.error('Erro ao salvar transações:', error);
    }
}

function carregarTransacoes() {
    try {
        const transacoesSalvas = localStorage.getItem('controlle-transactions');
        console.log('Dados brutos do localStorage:', transacoesSalvas);
        
        if (transacoesSalvas && transacoesSalvas !== 'null') {
            const dadosCarregados = JSON.parse(transacoesSalvas);
            console.log('Dados após JSON.parse:', dadosCarregados);
            
            // Verifica se é um array válido
            if (Array.isArray(dadosCarregados)) {
                // Substitui todo o conteúdo do array transactions
                transactions.splice(0, transactions.length, ...dadosCarregados);
                console.log('Transações carregadas com sucesso:', transactions);
                return true;
            } else {
                console.log('Dados não são um array válido');
                return false;
            }
        } else {
            console.log('Nenhuma transação encontrada no localStorage');
            return false;
        }
    } catch (error) {
        console.error('Erro ao carregar transações:', error);
        console.log('Limpando transactions devido ao erro');
        transactions.splice(0, transactions.length); // Limpa o array
        return false;
    }
}
 

function limparDados() {
        localStorage.removeItem('controlle-transactions');
        transactions = [];
        console.log('Dados limpos do localStorage');
}