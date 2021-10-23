import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpI8H6Z4DC2B4O8P6OyHf7X2jiRcaFjF4",
    authDomain: "instagram-clone-ce544.firebaseapp.com",
    projectId: "instagram-clone-ce544",
    storageBucket: "instagram-clone-ce544.appspot.com",
    messagingSenderId: "842700080048",
    appId: "1:842700080048:web:698f51ce79ee96efb1cc75"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}