import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDaZacv_B_rQlS3iw31uUszDo-Gg86eh-g",
authDomain: "registronotas-b5a79.firebaseapp.com",
projectId: "registronotas-b5a79",
storageBucket: "registronotas-b5a79.appspot.com",
messagingSenderId: "708751211118",
appId: "1:708751211118:web:8d535a97f99e88c51e447f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//referencia firestore
export const insert=(nombre, nota, promedio)=>{
    addDoc(collection(db, 'RegistroNotas'),{nombre: nombre, notas: nota, promedio: promedio});
}
export const sumar=(nota)=>{
    addDoc(collection(db, 'RegistroNotas'),{notas: [nota]});
}
export const getRegistros =()=> getDocs(collection(db,'RegistroNotas'));

export const eliminarRegistro =id=> deleteDoc(doc(db, 'RegistroNotas',id));

//export const eliminarTodo =()=> deleteDoc((db, 'RegistroNotas'));

export const getRegistro =(id)=> getDoc(doc(db,'RegistroNotas', id));

export const actualizarRegistro = (id, nuevoCampo)=>{updateDoc(doc(db, 'RegistroNotas', id), nuevoCampo)}