// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACbCB8hR76QRu7NbeKejMTe009JgNk5Xw",
  authDomain: "my-shop-8f1c3.firebaseapp.com",
  projectId: "my-shop-8f1c3",
  storageBucket: "my-shop-8f1c3.appspot.com",
  messagingSenderId: "296175329306",
  appId: "1:296175329306:web:2be5ad3b129c09cfa7f1a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };





