import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useGetDocument from "./useGetDocument";

const useRestaurant = (documentId: string) => {
  const { data, error, loading } = useGetDocument<Restaurant>(restuantCol, documentId);

  return {
    data, 
    error, 
    loading
  }
};

export default useRestaurant;
