// cadastro.js

// Função para cadastrar usuário
function cadastrarUsuario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, senha)
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
  function loginUsuario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    firebase.auth().signInWithEmailAndPassword(email, senha)
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
  
  // Função para buscar produtos
  async function buscarProdutos() {
    const db = firebase.firestore();
    const produtosRef = db.collection("produtos");
    const querySnapshot = await produtosRef.get();
    
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
  }
  
  // Função para adicionar produto ao carrinho
  async function adicionarCarrinho(nome, preco, descricao, imagem, cor, tamanho) {
    const user = firebase.auth().currentUser;
  
    if (user) {
      const db = firebase.firestore();
      const carrinhoRef = db.collection("carrinhos").doc(user.uid);
      
      try {
        await carrinhoRef.update({
          produtos: firebase.firestore.FieldValue.arrayUnion({
            nome,
            preco,
            descricao,
            imagem,
            cor,
            tamanho,
            quantidade: 1
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
  