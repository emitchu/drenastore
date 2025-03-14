// Função para carregar as informações do produto específico
async function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id'); // Pegando o ID do produto da URL
    const produtoRef = doc(db, "produtos", produtoId);

    try {
        const produtoDoc = await getDoc(produtoRef);

        if (produtoDoc.exists()) {
            const produto = produtoDoc.data();
            console.log(produto); // Exibindo os dados no console

            // Exibindo as informações do produto na página
            document.getElementById("produto-imagem").src = produto.imagem;
            document.getElementById("produto-nome").innerText = produto.nome;
            document.getElementById("produto-descricao").innerText = produto.descricao;
            document.getElementById("produto-tamanho").innerText = "Tamanho: " + produto.tamanho;
            document.getElementById("produto-cor").innerText = "Cor: " + produto.cor;
            document.getElementById("produto-preco").innerText = "R$ " + produto.preco;

            // Carregar os tamanhos no select
            const tamanhoSelect = document.getElementById('tamanho');
            produto.tamanhos.forEach(tamanho => {
                const option = document.createElement('option');
                option.value = tamanho;
                option.textContent = tamanho;
                tamanhoSelect.appendChild(option);
            });
        } else {
            console.log("Nenhum produto encontrado!");
        }
    } catch (error) {
        console.error("Erro ao carregar o produto:", error);
    }
}
