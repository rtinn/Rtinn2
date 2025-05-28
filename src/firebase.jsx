import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AlzaSyAMi6tEFxICIDqKDXDE8A_DKARTIBdJrU0",
  authDomain: "portfolio-368f0.firebaseapp.com",
  projectId: "portfolio-368f0",
  storageBucket: "portfolio-368f0.firebasestorage.app",
  messagingSenderId: "682410081912",
  appId: "1:682410081912:web:bc3bafbdb0e4919a5f7780"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);