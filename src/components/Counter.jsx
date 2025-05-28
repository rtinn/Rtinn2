import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Counter() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const counterRef = doc(db, 'visits', 'counter');
      const counterSnap = await getDoc(counterRef);
      if (counterSnap.exists()) {
        setVisitCount(counterSnap.data().count);
      } else {
        setVisitCount(0); // Si le document n'existe pas encore
      }
    };
    fetchCount();
  }, []); // Exécute une seule fois au montage

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Nombre de visiteurs</h1>
      <p className="text-xl">Ce site a été visité {visitCount} fois.</p>
    </div>
  );
}

export default Counter;