import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz9gkuplnT7_dwxMsOXMmIjR_FAMS0DDU",
  authDomain: "ecom-6ace4.firebaseapp.com",
  projectId: "ecom-6ace4",
  storageBucket: "ecom-6ace4.firebasestorage.app",
  messagingSenderId: "957282974045",
  appId: "1:957282974045:web:8616d8de3d1d62c20b50b4",
  measurementId: "G-GQKKR7Y0X6",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const fireDB = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics (optional, if you need Firebase analytics)
const analytics = getAnalytics(app);

export { fireDB, auth, analytics };
