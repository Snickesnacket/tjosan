import { orderBy } from "firebase/firestore";
import { tipsCol } from "../services/firebase";
import useCollection from "./useGetCollection";
import { Tip } from "../types/Tips.types";

const useTips = () => {
  const { data, error, loading } = useCollection<Tip>(tipsCol, orderBy("Tips"));

  return {
    data, 
    error, 
    loading
  }
};

export default useTips;
