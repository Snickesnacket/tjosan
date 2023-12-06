import { useCallback, useState, useEffect } from "react";
import { getDoc, CollectionReference, doc } from "firebase/firestore";

const useGetDocument = <T>(
  colRef: CollectionReference<T>,
  documentId: string
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | string | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    setError(null);
    setLoading(true);
  
    try {
      const docRef = doc(colRef, documentId);
      const docSnapshot = await getDoc(docRef);
  
      if (!docSnapshot.exists()) {
        throw new Error('Det här dokumentet finns inte');
      }
  
      const data: T = {
        ...docSnapshot.data(),
        _id: docSnapshot.id,
      };
  
      setData(data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error : new Error('Error uppstod'));
    } finally {
      setLoading(false);
    }
  }, [colRef, documentId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    error,
    getData,
    loading,
  };
};

export default useGetDocument;
