import {
  CollectionReference,
  QueryConstraint,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";



const useGetCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);


  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      try {
        const data: T[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id,
        }));
        setData(data);
      } catch (error) {
        console.error("Error uppstod i samband med hämtning av collection collection:", error)
        setError(error instanceof Error ? error : new Error('Något gick fel'));
      }
      setLoading(false);
    }, (error) => {
      console.error("Snapshot error:", error);
      setLoading(false);
      setError(error instanceof Error ? error : new Error('Något gick fel'));
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colRef]);

  return {
    data,
    loading,
    error
  };
};

export default useGetCollection;

