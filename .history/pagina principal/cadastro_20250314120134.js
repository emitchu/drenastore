// cadastro.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

export function loginUsuario(auth, email, senha) {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado:", user);
    })
    .catch((error) => {
      console.error(`Erro: ${error.code}, ${error.message}`);
    });
}

export function cadastrarUsuario(auth, email, senha) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user);
    })
    .catch((error) => {
      console.error(`Erro: ${error.code}, ${error.message}`);
    });
}
