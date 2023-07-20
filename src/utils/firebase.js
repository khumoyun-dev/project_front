// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "collection-eff0e.firebaseapp.com",
    projectId: "collection-eff0e",
    storageBucket: "collection-eff0e.appspot.com",
    messagingSenderId: "17664047106",
    appId: "1:17664047106:web:543e04996a015101d7cf1b",
    measurementId: "G-R6E8W2EELC"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;