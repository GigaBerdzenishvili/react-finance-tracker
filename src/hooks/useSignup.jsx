import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      if (!response) {
        throw new Error("Could not sign up user");
      }
      // add display name
      await response.user.updateProfile({ displayName });

      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCanceled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { signup, error, isPending };
};
