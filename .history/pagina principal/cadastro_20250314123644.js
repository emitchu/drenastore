import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, arrayUnion, collection, getDocs, setDoc, doc } from './firebaseConfig.js';

// Função genérica para exibir mensagens de erro
function exibirErro(mensagem) {
  alert(mensagem);
  console.error(mensagem);
}

// Função para cadastrar usuário
function cadastrarUsuario() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user);
      alert("Usuário cadastrado com sucesso!");
    })
    .catch((error) => {
      exibirErro("Erro ao cadastrar usuário: " + error.message);
    });
}

// Função para fazer login
function loginUsuario() {
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
      exibirErro("Erro ao fazer login: " + error.message);
    });
}

// Função para buscar produtos
async function buscarProdutos() {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    
    document.getElementById('produtos').innerHTML = "";
  
    querySnapshot.forEach((doc) => {
      const produto = doc.data();
      console.log(produto);
  
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
      
      document.getElementById('produtos').appendChild(produtoDiv);
    });
  
    // Adicionar o botão "Carrinho" após os produtos
    const carrinhoButton = document.createElement('button');
    carrinhoButton.textContent = "Ir para o Carrinho";
    carrinhoButton.onclick = () => {
      window.location.href = "testecarrinho.html"; // Redireciona para a página do carrinho
    };
    document.getElementById('produtos').appendChild(carrinhoButton);
}

// Função para adicionar produto ao carrinho
async function adicionarCarrinho(nome, preco, descricao, imagem, cor, tamanho) {
    const user = auth.currentUser;
  
    if (user) {
      console.log("Usuário logado:", user.uid);
      console.log("Produto:", { nome, preco, descricao, imagem, cor, tamanho });
  
      const carrinhoRef = doc(db, "carrinhos", user.uid);
  
      try {
        // Tentar adicionar o produto ao carrinho
        await setDoc(carrinhoRef, {
          produtos: arrayUnion({
            nome,
            preco,
            descricao,
            imagem,
            cor,
            tamanho,
            quantidade: 1
          }),
        }, { merge: true });
  
        console.log("Produto adicionado ao carrinho");
        alert("Produto adicionado ao carrinho!");
      } catch (error) {
        exibirErro("Erro ao adicionar o produto ao carrinho.");
      }
    } else {
      exibirErro("Você precisa estar logado para adicionar ao carrinho.");
    }
}

// Torne a função global para ser acessada no HTML
window.adicionarCarrinho = adicionarCarrinho;
