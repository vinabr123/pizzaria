
function obterItensCarrinho() {
    const itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    return itens;
}


function salvarItensCarrinho(itens) {
    localStorage.setItem('carrinho', JSON.stringify(itens));
}


function exibirItensCarrinho() {
    const itens = obterItensCarrinho();
    const container = document.getElementById('carrinho-container');
    container.innerHTML = ''; 

    if (itens.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio. Adicione itens ao carrinho!</p>';
        return;
    }

    
    itens.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-nome">${item.nome}</div>
            <div class="item-preco">R$ ${item.preco.toFixed(2)}</div>
            <div class="item-quantidade">Quantidade: ${item.quantidade}</div>
            <button class="remove-btn" data-index="${index}">Remover</button>
        `;
        container.appendChild(div);
    });

   
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removerItemCarrinho);
    });
}


function removerItemCarrinho(event) {
    const index = event.target.getAttribute('data-index');
    let itens = obterItensCarrinho();

    
    itens.splice(index, 1);

    
    salvarItensCarrinho(itens);
    exibirItensCarrinho();
}

function adicionarItemCarrinho(item) {
    const itens = obterItensCarrinho();
    itens.push(item);
    salvarItensCarrinho(itens);
    exibirItensCarrinho();
}


window.onload = exibirItensCarrinho;
