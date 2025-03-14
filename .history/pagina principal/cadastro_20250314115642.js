// cadastro.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getFirestore, collection, getDocs } from './firebaseConfig.js';

const db = getFirestore();

// Função para cadastrar usuário
window.cadastrarUsuario = function() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user);
      alert("Usuário cadastrado com sucesso!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
      alert("Erro ao cadastrar usuário: " + errorMessage);
    });
}

// Função para fazer login
window.loginUsuario = function() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      alert("Usuário logado com sucesso!");
      
      // Depois de logar, exibe os produtos
      exibirProdutos();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
      alert("Erro ao fazer login: " + errorMessage);
    });
}

// Função para buscar e exibir os produtos
async function exibirProdutos() {
  const produtosDiv = document.getElementById("produtos");
  
  // Busca os produtos no Firestore
  const produtosRef = collection(db, "produtos");
  const produtosSnapshot = await getDocs(produtosRef);
  
  // Limpa a div de produtos antes de adicionar novos itens
  produtosDiv.innerHTML = "";

  // Adiciona os produtos na tela
  produtosSnapshot.forEach((doc) => {
    const produto = doc.data();
    
    // Criação de elementos HTML para mostrar o produto
    const produtoDiv = document.createElement("div");
    produtoDiv.classList.add("produto");

    const nomeProduto = document.createElement("h2");
    nomeProduto.innerText = produto.nome;
    produtoDiv.appendChild(nomeProduto);

    const descricaoProduto = document.createElement("p");
    descricaoProduto.innerText = produto.descricao;
    produtoDiv.appendChild(descricaoProduto);

    const imagemProduto = document.createElement("img");
    imagemProduto.src = produto.imagem; // A URL da imagem do produto
    produtoDiv.appendChild(imagemProduto);

    const precoProduto = document.createElement("p");
    precoProduto.innerText = `Preço: R$ ${produto.preco}`;
    produtoDiv.appendChild(precoProduto);

    const corProduto = document.createElement("p");
    corProduto.innerText = `Cor: ${produto.cor}`;
    produtoDiv.appendChild(corProduto);

    const tamanhoProduto = document.createElement("p");
    tamanhoProduto.innerText = `Tamanho: ${produto.tamanho}`;
    produtoDiv.appendChild(tamanhoProduto);

    const quantidadeProduto = document.createElement("p");
    quantidadeProduto.innerText = `Quantidade disponível: ${produto.quantidade}`;
    produtoDiv.appendChild(quantidadeProduto);

    produtosDiv.appendChild(produtoDiv);
  });
}
