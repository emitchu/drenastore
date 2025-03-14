function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const produtos = document.querySelectorAll('.produto');
    
    produtos.forEach(produto => {
        const nomeProduto = produto.querySelector('.nome').textContent.toLowerCase();
        
        if (nomeProduto.includes(input)) {
            produto.style.display = 'block'; // Exibe o produto
        } else {
            produto.style.display = 'none'; // Oculta o produto
        }
    });
}