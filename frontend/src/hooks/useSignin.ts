import axios, { isAxiosError } from "axios";
import { useRecoilValue } from "recoil";
import { signinAtom } from "../store/recoil";
import URL from "../config/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignin = () => {
  const navigate = useNavigate();
  const values = useRecoilValue(signinAtom);
  const { email, password } = values;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  async function sendReq() {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/api/v1/signin`, {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.username;
      localStorage.setItem("dailymuse", token);
      localStorage.setItem("dailymuse-username", user);
      setSuccess(response.data.msg);
      navigate("/blogs");
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.msg);
        setLoading(false);
      }
    }
  }
  return {
    error,
    success,
    sendReq,
    loading,
  };
};

export default useSignin;
