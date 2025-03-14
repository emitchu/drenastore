
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