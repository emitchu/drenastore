// cadastro.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig.js';

// Função para cadastrar usuário
window.cadastrarUsuario = function() {
  // Captura o email e senha dos campos de entrada
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
  // Captura o email e senha dos campos de entrada
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      alert("Usuário logado com sucesso!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
      alert("Erro ao fazer login: " + errorMessage);
    });
}
