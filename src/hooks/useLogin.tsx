import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (body: any) => {
    try {
      const { username, password, tenantCode } = body;
      setError(null);
      setLoading(true);

      const res = await axios.post(
        "/auth/login",
        {
          username,
          password,
          tenantCode,
        },
        { withCredentials: true }
      );
      const data = res.data;
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "LOGIN", payload: data });
      navigate("/app");
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return { login, error, loading };
};
