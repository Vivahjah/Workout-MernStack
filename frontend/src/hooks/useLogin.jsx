import { useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async ( email, password) => {
    const user = {  email, password };
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/v1/workouts/auth/login",
        user
      );

      dispatch({ type: "LOGIN", payload: response.data});
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoading(null);
      console.log(response);
    } catch (error) {
      setError(error.response.data.msg);
      setIsLoading(null);
      console.log(error);
    }
  };
  return { login, error, isLoading };
};
