import { Button } from 'react-bootstrap';
import useTips from '../hooks/useGetTips';
import { tipsCol } from '../services/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';

const Tips = () => {
  const { data, loading } = useTips();

  const deleteTip = async (documentId: string) => {
    try {
      const docRef = doc(tipsCol, documentId);
      await deleteDoc(docRef);
      alert('Tips raderat'); 
    } catch (error) {
      if (error instanceof Error) {
        alert('Fel vid radering av tips: ' + error.message);
      }
    }
  };

  return (
    <>
      {loading && <p>Laddar...</p>} 
      {data && data.length > 0 && (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Från</th> 
              <th>Tips</th> 
              <th>Radera</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tip) => (
              <tr key={tip._id}>
                <td>{tip.email}</td>
                <td>{tip.Tips}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteTip(tip._id)}>
                    Radera 
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Tips;
