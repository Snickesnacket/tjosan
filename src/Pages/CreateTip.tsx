import { newTipCol } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Tip } from "../types/Tips.types";
import TipForm from "../components/TipForm";
import { toast } from "react-toastify";

export const CreateTip = () => {
  const addTip = async (data: Tip) => {
    const docRef = doc(newTipCol);
    try{
    await setDoc(docRef, {
      ...data,
    });
  } catch (error) {
    toast.warning("Error uppstod i skapandet av nytt tips");
    console.error( error)
  }
  };
  return (
    <>
      <h1>Skicka in ett tips till oss</h1>
      <TipForm onSave={addTip} />
    </>
  );
};
