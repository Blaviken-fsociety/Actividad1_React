import firebase from "firebase/app";
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCu5BqtHuKJe3nyUXGB9NOldz5R4m3KTH4",
  authDomain: "actividad1-react.firebaseapp.com",
  projectId: "actividad1-react",
  storageBucket: "actividad1-react.firebasestorage.app",
  messagingSenderId: "1058066036573",
  appId: "1:1058066036573:web:decd4e502ecb8863fb9ab4",
  measurementId: "G-QNNLHKFT05"
};

// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase}