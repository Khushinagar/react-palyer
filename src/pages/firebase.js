// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBloL15Rss6eVmpZjIr6nkNt5fqpnpt3jU",
  authDomain: "react-music-palyer.firebaseapp.com",
  projectId: "react-music-palyer",
  storageBucket: "react-music-palyer.appspot.com",
  messagingSenderId: "292570875007",
  appId: "1:292570875007:web:99ec373f380039c1346b4a"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const firestore =getFirestore(app)
 export {auth,app, firestore};