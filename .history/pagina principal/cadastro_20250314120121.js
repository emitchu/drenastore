// cadastro.js
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig.js';

// Função para cadastrar um usuário
function cadastrarUsuario(email, senha) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Cadastro bem-sucedido
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
    });
}

// Função de login
function loginUsuario(email, senha) {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Login bem-sucedido
      const user = userCredential.user;
      console.log("Usuário logado:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
    });
}

window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
