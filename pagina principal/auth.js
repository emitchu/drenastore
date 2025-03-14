// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBWLVnBlGSwbLsat8U9wfFjbPQRD5qRKhI",
    authDomain: "drena-store.firebaseapp.com",
    projectId: "drena-store",
    storageBucket: "drena-store.firebasestorage.app",
    messagingSenderId: "108887454441",
    appId: "1:108887454441:web:aa58b5166ef77df66e3678",
    measurementId: "G-5Q5VQM4ELC"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Referências aos elementos da interface
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const signupFormContainer = document.getElementById('signup-form-container');
const createAccountBtn = document.getElementById('create-account-btn');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

// Exibir o formulário de criação de conta
createAccountBtn.addEventListener('click', () => {
    signupFormContainer.style.display = 'block';
    loginForm.style.display = 'none';
});

// Login do usuário
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Recuperar os dados do carrinho do usuário
        const cartRef = doc(db, "users", user.uid);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
            console.log("Carrinho de compras encontrado:", cartDoc.data());
        } else {
            console.log("Carrinho de compras vazio.");
        }

        alert("Login bem-sucedido!");
        window.location.href = "drenastore.html"; // Redirecionar para a página principal
    } catch (error) {
        alert("Erro ao fazer login: " + error.message);
        console.error("Erro ao fazer login: ", error);
    }
});

// Criação de conta
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (email && password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Criar o documento para o usuário com um carrinho vazio
            await setDoc(doc(db, "users", user.uid), {
                cart: [] // Carrinho vazio no início
            });

            alert("Conta criada com sucesso!");
            window.location.href = "drenastore.html"; // Redirecionar para a página principal
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao criar conta: " + errorMessage);
            console.error("Erro ao criar conta: ", errorCode, errorMessage);
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});




