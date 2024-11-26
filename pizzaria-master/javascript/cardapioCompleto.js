
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
            <button class="delete-btn" data-id="${item.id}">Deletar</button>
        `;
        container.appendChild(div);
    });

    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deletarItem);
    });
}


function deletarItem(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    let itens = obterItens();

    
    itens = itens.filter(item => item.id !== itemId);

    
    salvarItens(itens);
    exibirItens();
}


function adicionarItem(event) {
    event.preventDefault();

    const categoria = document.getElementById('categoria').value;
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;

    const item = { id: Date.now(), categoria, nome, descricao, preco, imagem };

    const itens = obterItens();
    itens.push(item);
    salvarItens(itens);
    exibirItens();
    document.getElementById('form-item').reset();
}


document.getElementById('form-item').addEventListener('submit', adicionarItem);


window.onload = exibirItens;
