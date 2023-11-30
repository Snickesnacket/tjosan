import { toast } from "react-toastify";
import RestaurantForm from "../components/RestaurantForm";
import { newRestaurantCol } from "../services/firebase";
import { RestaurantFormData } from "../types/Restaurant.types";
import { doc, setDoc } from "firebase/firestore";


export const CreateRestaurant = () => {
  const addRestaurant = async (data: RestaurantFormData) => {
    const docRef = doc(newRestaurantCol);
    try{
      await setDoc(docRef, {
        ...data,
      });
    } catch (error) {
      toast.warning("Error uppstod i samband md skapandet av ny restaurag");
      console.error( error)
    }
   
  };

  return (
    <>
      <h1>Fyll i uppgifter om restaurangen</h1>
      <RestaurantForm onSave={addRestaurant} />
    </>
  );
};
