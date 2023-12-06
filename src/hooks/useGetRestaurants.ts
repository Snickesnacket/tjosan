import { orderBy } from "firebase/firestore";
import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useGetCollection from "./useGetCollection";

const useRestaurants = () => {

  const { data, error, loading } = useGetCollection<Restaurant>(restuantCol, orderBy("Namn"));

  return {
    data, 
    error, 
    loading
  }

};

export default useRestaurants;
