
const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];


function renderizarLista() {
    const tbody = document.getElementById('funcionarios-tbody');
    tbody.innerHTML = ''; 

    if (funcionarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">Nenhum funcionário cadastrado.</td></tr>';
        return;
    }

    funcionarios.forEach(funcionario => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.telefone}</td>
            <td>${funcionario.cargo}</td>
            <td>R$ ${parseFloat(funcionario.salario).toFixed(2)}</td>
            <td>
                <button class="delete-btn" data-cpf="${funcionario.cpf}">Deletar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deletarFuncionario);
    });
}


function deletarFuncionario(event) {
    const cpf = event.target.getAttribute('data-cpf');

    
    const novosFuncionarios = funcionarios.filter(func => func.cpf !== cpf);

    
    localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios));

    
    renderizarLista();
}


renderizarLista();
