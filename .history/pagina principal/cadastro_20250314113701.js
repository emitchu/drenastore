// script.js
import { auth, createUserWithEmailAndPassword } from "./firebaseConfig.js";

function cadastrarUsuario(email, senha) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário criado com sucesso:", user);
    })
    .catch((error) => {
      console.error("Erro ao criar usuário:", error);
    });
}

// script.js
import { auth, signInWithEmailAndPassword } from "./firebaseConfig.js";

function loginUsuario(email, senha) {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado com sucesso:", user);
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
}

// script.js
import { db, collection, getDocs } from "./firebaseConfig.js";

async function buscarProdutos() {
  const produtosCol = collection(db, "produtos");
  const produtosSnapshot = await getDocs(produtosCol);
  const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Produtos:", produtosList);
  return produtosList;
}

