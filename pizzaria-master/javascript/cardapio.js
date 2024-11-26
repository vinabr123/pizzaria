
function obterItens() {
    const itens = JSON.parse(localStorage.getItem('itensCardapio'));
    return itens ? itens : [];
}


function salvarItens(itens) {
    localStorage.setItem('itensCardapio', JSON.stringify(itens));
}


function exibirItens() {
    const itens = obterItens();
    const container = document.getElementById('itens-container');
    container.innerHTML = '';

    itens.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-nome">${item.nome}</div>
            <div class="item-descricao">${item.descricao}</div>
            <div class="item-preco">R$ ${item.preco.toFixed(2)}</div>
            <div class="item-categoria">${item.categoria}</div>
            <button class="add-to-cart-btn" data-id="${item.id}">Adicionar ao Carrinho</button>
        `;
        container.appendChild(div);
    });

   
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
}


function adicionarAoCarrinho(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    let itens = obterItens();
    const itemSelecionado = itens.find(item => item.id === itemId);

    if (itemSelecionado) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(itemSelecionado);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }
}


function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    document.getElementById('carrinho-count').innerText = carrinho.length;
}


function inicializarCardapio() {
    const itensPadrao = [
        { id: 1, nome: 'Coca-cola 2L', descricao: 'Refrigerante Coca-cola 2L', preco: 10.50, categoria: 'Bebida', imagem: 'https://via.placeholder.com/250x150?text=Coca-cola+2L' },
        { id: 2, nome: 'X-tudo', descricao: 'Sanduíche com carne, queijo, presunto, bacon e ovo', preco: 20.00, categoria: 'Salgado', imagem: 'https://via.placeholder.com/250x150?text=X-tudo' },
        { id: 3, nome: 'Risole', descricao: 'Salgado recheado com carne ou frango', preco: 5.00, categoria: 'Salgado', imagem: 'https://via.placeholder.com/250x150?text=Risole' },
        { id: 4, nome: 'Suco de Uva', descricao: 'Suco natural de uva', preco: 7.50, categoria: 'Bebida', imagem: 'https://via.placeholder.com/250x150?text=Suco+de+Uva' },
        { id: 5, nome: 'Pizza de Calabresa', descricao: 'Pizza de calabresa com queijo e molho especial', preco: 35.00, categoria: 'Pizza', imagem: 'https://via.placeholder.com/250x150?text=Pizza+Calabresa' }
    ];

    
    if (!localStorage.getItem('itensCardapio')) {
        salvarItens(itensPadrao);
    }
}


window.onload = function() {
    inicializarCardapio();
    exibirItens();
    atualizarCarrinho();
};
