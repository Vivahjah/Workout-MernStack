import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error ('Authentication context must be use inside the workout provider');
    }
  return context;
};

export default useAuthContext;