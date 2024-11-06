import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1v5FUmelS3RrrEN7K3iZ2sHdo1enVpGE",
  authDomain: "proyecto-nuevo-8771b.firebaseapp.com",
  projectId: "proyecto-nuevo-8771b",
  storageBucket: "proyecto-nuevo-8771b.firebasestorage.app",
  messagingSenderId: "429068348723",
  appId: "1:429068348723:web:4272946fcd55d95ccc2246"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
