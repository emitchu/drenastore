// Função para buscar os produtos do carrinho
window.buscarCarrinho = async function () {
    const user = auth.currentUser;
    if (!user) {
      alert("Você precisa estar logado para ver o carrinho.");
      return;
    }
  
    const carrinhoRef = doc(db, "carrinhos", user.uid);
    const carrinhoSnapshot = await getDoc(carrinhoRef);
  
    if (carrinhoSnapshot.exists()) {
      const produtosCarrinho = carrinhoSnapshot.data().produtos;
      const carrinhoDiv = document.getElementById('carrinho');
  
      console.log("Produtos do carrinho:", produtosCarrinho); // Depuração
  
      if (produtosCarrinho && produtosCarrinho.length > 0) {
        produtosCarrinho.forEach(produto => {
          const produtoDiv = document.createElement('div');
          produtoDiv.classList.add('produto');
  
          produtoDiv.innerHTML = `
            <h3>${produto.nome}</h3>
            <img src="${produto.imagem}" alt="${produto.nome}" />
            <p>Preço: ${produto.preco}€</p>
            <p>Cor: ${produto.cor}</p>
            <p>Tamanho: ${produto.tamanho}</p>
            <p>Quantidade: ${produto.quantidade}</p>
          `;
  
          carrinhoDiv.appendChild(produtoDiv);
        });
      } else {
        carrinhoDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
      }
    } else {
      alert("Carrinho não encontrado.");
    }
  };
  