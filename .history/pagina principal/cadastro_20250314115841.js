// cadastro.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, collection, getDocs, doc, setDoc, updateDoc, arrayUnion } from './firebaseConfig.js';

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

      // Após o login bem-sucedido, buscar os produtos
      buscarProdutos();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
      alert("Erro ao fazer login: " + errorMessage);
    });
}

// Função para buscar produtos do Firestore
async function buscarProdutos() {
  const produtosRef = collection(db, "produtos"); // Referência para a coleção "produtos"
  const querySnapshot = await getDocs(produtosRef);
  
  // Limpar produtos existentes (caso haja algum na página)
  document.getElementById('produtos').innerHTML = "";

  // Exibir os produtos
  querySnapshot.forEach((doc) => {
    const produto = doc.data();  // Pega os dados do produto
    console.log(produto);  // Mostrar no console para depuração

    // Criar elementos HTML para exibir os produtos
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');

    produtoDiv.innerHTML = `
      <h3>${produto.nome}</h3>
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <p>Preço: ${produto.preco}€</p>
      <p>Descrição: ${produto.descricao}</p>
      <p>Cor: ${produto.cor}</p>
      <p>Tamanho: ${produto.tamanho}</p>
      <p>Quantidade: ${produto.quantidade}</p>
      <button onclick="adicionarCarrinho('${produto.nome}', '${produto.preco}', '${produto.descricao}', '${produto.imagem}', '${produto.cor}', '${produto.tamanho}')">Adicionar ao Carrinho</button>
    `;
    
    // Adicionar o produto à seção de produtos
    document.getElementById('produtos').appendChild(produtoDiv);
  });
}

// Função para adicionar produto ao carrinho
async function adicionarCarrinho(nome, preco, descricao, imagem, cor, tamanho) {
  const user = auth.currentUser;

  if (user) {
    // Refere-se ao carrinho do usuário
    const carrinhoRef = doc(db, "carrinhos", user.uid);
    
    try {
      // Se o carrinho já existir, atualiza com o novo produto, se não, cria um novo carrinho
      await updateDoc(carrinhoRef, {
        produtos: arrayUnion({
          nome,
          preco,
          descricao,
          imagem,
          cor,
          tamanho,
          quantidade: 1 // Inicializa com quantidade 1
        })
      });
      
      alert("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar o produto ao carrinho.");
    }
  } else {
    alert("Você precisa estar logado para adicionar ao carrinho.");
  }
}
