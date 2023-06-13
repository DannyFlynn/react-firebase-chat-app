import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHvltJKD-S2DxfJSnIIsyWcU771QZ7Wvw",
    authDomain: "fir-portfolio-ca20d.firebaseapp.com",
    projectId: "fir-portfolio-ca20d",
    storageBucket: "fir-portfolio-ca20d.appspot.com",
    messagingSenderId: "594410453043",
    appId: "1:594410453043:web:ed008f0ee1cb08f7790b46",
    measurementId: "G-K0EH6KKHQW"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
