import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Försöka att använda AuthContext utanför AuthContextProvider omfång");
  }

  return authContext;
};

export default useAuth;
