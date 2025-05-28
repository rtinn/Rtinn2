const functions = require('firebase-functions');
const { getFirestore, doc, increment, updateDoc } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: "AlzaSyAMi6tEFxICIDqKDXDE8A_DKARTIBdJrU0",
  authDomain: "portfolio-368f0.firebaseapp.com",
  projectId: "portfolio-368f0",
  storageBucket: "portfolio-368f0.firebasestorage.app",
  messagingSenderId: "682410081912",
  appId: "1:682410081912:web:bc3bafbdb0e4919a5f7780"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.incrementVisit = functions.https.onRequest(async (req, res) => {
  const counterRef = doc(db, 'visits', 'counter');
  await updateDoc(counterRef, {
    count: increment(1)
  });
  res.status(200).send('Compteur incrémenté');
});