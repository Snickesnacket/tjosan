import { orderBy } from "firebase/firestore";
import { adminCol } from "../services/firebase";
import { AdminData } from "../types/Admin.types";
import useGetCollection from "./useGetCollection";

const useAdmin = () => {
  const { data, error, loading } = useGetCollection<AdminData>(adminCol, orderBy("Namn"));

  return {
    data, 
    error, 
    loading
  }
};
export default useAdmin;
