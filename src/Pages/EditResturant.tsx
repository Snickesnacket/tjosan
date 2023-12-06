import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useRestaurant from "../hooks/useGetRestaurant";
import { restuantCol } from "../services/firebase";
import RestaurantForm from "../components/RestaurantForm";
import { RestaurantFormData } from "../types/Restaurant.types";

const EditRestaurant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const documentId = id as string;
  const { data,  loading } = useRestaurant(documentId);

  if (loading || !data) {
    return <p>Loading todo...</p>;
  }

  const updateRestaurant = async (data: RestaurantFormData) => {
    const docRef = doc(restuantCol, documentId);
    toast.promise(
      updateDoc(docRef, {
        ...data,
      }),
      {
        pending: "Sparar",
        success: "Sparat",
        error: "Något gick fel",
      }
    );
    navigate("/Restauranger");
  };

  const deleteRestaurant = async () => {
    const docRef = doc(restuantCol, documentId);
    try { 
    await deleteDoc(docRef);

    navigate("/Restauranger", {
      replace: true,
    });
    } catch (error) {
      toast.warning('något gick fel i radering av restaurang')
      console.error(error)
    }
  };

  return (
    <>
      <h1>Edit: {data.Namn}</h1>

      <RestaurantForm onSave={updateRestaurant} initialValues={data} />

      <Button variant="warning" onClick={() => deleteRestaurant()}>
        Radera
      </Button>

      <Button variant="secondary" onClick={() => navigate(-1)}>
        &laquo; Gå tillbaka
      </Button>
    </>
  );
};

export default EditRestaurant;
