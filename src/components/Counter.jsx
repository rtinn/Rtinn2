import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Counter() {
  const [visitCount, setVisitCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const counterRef = doc(db, 'visits', 'counter');
        const counterSnap = await getDoc(counterRef);
        if (counterSnap.exists()) {
          setVisitCount(counterSnap.data().count);
        } else {
          setVisitCount(0); // Si le document n'existe pas
        }
      } catch (err) {
        setError('Erreur lors de la récupération du compteur');
        console.error(err);
      }
    };
    fetchCount();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Number of Visitors</h1>
      <p className="text-xl">This site has been visited {visitCount} times.</p>
    </div>
  );
}

export default Counter;