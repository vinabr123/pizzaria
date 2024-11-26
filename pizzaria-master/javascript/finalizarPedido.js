
function obterItensCarrinho() {
    const itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    return itens;
}


function exibirResumoPedido() {
    const itens = obterItensCarrinho();
    const container = document.getElementById('itens-pedido');
    const totalElemento = document.getElementById('total-valor');
    const totalFinalElemento = document.getElementById('total-final');

    let total = 0; 

    container.innerHTML = ''; 

    
    itens.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-resumo';
        div.innerHTML = `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)} (x${item.quantidade})</p>
        `;
        container.appendChild(div);

        
        const preco = parseFloat(item.preco);
        const quantidade = parseInt(item.quantidade);

        
        if (!isNaN(preco) && !isNaN(quantidade)) {
            total += preco * quantidade; 
        }
    });

    
    const taxaEntrega = 5.00;
    const totalFinal = total + taxaEntrega;

    
    totalElemento.textContent = `R$ ${total.toFixed(2)}`;
    totalFinalElemento.textContent = `R$ ${totalFinal.toFixed(2)}`;
}


function finalizarPedido(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const observacao = document.getElementById('observacao').value;
    const pagamento = document.getElementById('pagamento').value;

    
    if (!nome || !endereco || !telefone || !pagamento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    
    alert(`Pedido Finalizado!
Nome: ${nome}
Endereço: ${endereco}
Telefone: ${telefone}
Observação: ${observacao ? observacao : 'Nenhuma'}
Forma de pagamento: ${pagamento}
Total Final: R$ ${document.getElementById('total-final').textContent}`);

    
    localStorage.removeItem('carrinho');

    
    window.location.href = "/pagina-confirmacao.html";
}


window.onload = exibirResumoPedido;


document.getElementById('form-finalizacao').addEventListener('submit', finalizarPedido);
