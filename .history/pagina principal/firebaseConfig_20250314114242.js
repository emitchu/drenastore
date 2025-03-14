// firebaseConfig.js
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>

const firebaseConfig = {
    apiKey: "AIzaSyBWLVnBlGSwbLsat8U9wfFjbPQRD5qRKhI",
    authDomain: "drena-store.firebaseapp.com",
    projectId: "drena-store",
    storageBucket: "drena-store.firebasestorage.app",
    messagingSenderId: "108887454441",
    appId: "1:108887454441:web:aa58b5166ef77df66e3678",
    measurementId: "G-5Q5VQM4ELC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, getDocs, addDoc, doc, setDoc, updateDoc };