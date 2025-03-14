// Exemplo simples de cálculo do total
const quantidadeInputs = document.querySelectorAll('.quantidade');
const precoCelulas = document.querySelectorAll('.preco');
const subtotalCelulas = document.querySelectorAll('.subtotal');
const totalElement = document.querySelector('.total h3');

function calcularTotal() {
    let total = 0;
    quantidadeInputs.forEach((input, index) => {
        const quantidade = parseInt(input.value);
        const preco = parseFloat(precoCelulas[index].textContent.replace('R$ ', '').replace(',', '.'));
        const subtotal = quantidade * preco;
        subtotalCelulas[index].textContent = `R$ ${subtotal.toFixed(2)}`;
        total += subtotal;
    });
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

quantidadeInputs.forEach(input => {
    input.addEventListener('change', function() {
        const produtoId = this.closest('.produto-carrinho').dataset.id;
        const novaQuantidade = parseInt(this.value);
        atualizarCarrinho(produtoId, novaQuantidade); // Atualiza no localStorage
        calcularTotal();
    });
});

// Exemplo simples de remoção de produto (opcional)
const removerButtons = document.querySelectorAll('.remover');

removerButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.parentNode.parentNode.remove();
        calcularTotal();
    });
});

calcularTotal(); // Calcula o total inicials