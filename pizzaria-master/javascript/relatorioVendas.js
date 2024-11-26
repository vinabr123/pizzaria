
const vendas = [
    { id: 1, data: "2024-11-01", cliente: "Ana Catarina", valor: 150.00, status: "pago" },
    { id: 2, data: "2024-11-05", cliente: "João Silva", valor: 75.00, status: "pago" },
    { id: 3, data: "2024-11-10", cliente: "Carlos Lima", valor: 200.00, status: "pago" },
    { id: 4, data: "2024-11-12", cliente: "Maria Souza", valor: 50.00, status: "cancelado" },
];


function renderizarTabela(vendasFiltradas) {
    const tabelaBody = document.getElementById('tabela-vendas-tbody');
    tabelaBody.innerHTML = '';

    vendasFiltradas.forEach(venda => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.data}</td>
            <td>${venda.cliente}</td>
            <td>R$ ${venda.valor.toFixed(2)}</td>
            <td>${venda.status}</td>
        `;

        tabelaBody.appendChild(tr);
    });
}

s
function filtrarVendas() {
    const dataInicial = document.getElementById('data-inicial').value;
    const dataFinal = document.getElementById('data-final').value;
    const status = document.getElementById('status').value;

    let vendasFiltradas = vendas;

   
    if (dataInicial) {
        vendasFiltradas = vendasFiltradas.filter(venda => venda.data >= dataInicial);
    }

    if (dataFinal) {
        vendasFiltradas = vendasFiltradas.filter(venda => venda.data <= dataFinal);
    }

    
    if (status !== 'todos') {
        vendasFiltradas = vendasFiltradas.filter(venda => venda.status === status);
    }

    renderizarTabela(vendasFiltradas);
}


document.getElementById('filtrar').addEventListener('click', filtrarVendas);


renderizarTabela(vendas);
