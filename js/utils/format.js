// Formata um número para o padrão de moeda brasileiro (BRL)

function formatCurrency(value) {
    // Converte para número e depois formata
    return Number(value).toLocaleString('pt-Br', {
        style: 'currency',
        currency: 'BRL',

    }); 
}

// Formata a data (ex: '2025-09-23' para '23/09/2025')

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}