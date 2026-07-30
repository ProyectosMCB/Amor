// =====================================================================
// CONFIGURACIÓN DE FIREBASE
// =====================================================================
// Aquí debes pegar la configuración de TU proyecto de Firebase
// (te la da Firebase cuando creas la app web). Sigue las instrucciones
// que Claude te dio en el chat para conseguirla, luego reemplaza los
// valores de abajo (dentro de las comillas) por los tuyos.
// =====================================================================

const firebaseConfig = {
    apiKey: "AIzaSyC_0J6-NJLQBLVNcHJUeCcXuG6gufsFaVs",
    authDomain: "amor-322c2.firebaseapp.com",
    projectId: "amor-322c2",
    storageBucket: "amor-322c2.firebasestorage.app",
    messagingSenderId: "620361636463",
    appId: "1:620361636463:web:9655ab57ce7de635444b9a"
};

// No necesitas tocar nada más de aquí para abajo
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
