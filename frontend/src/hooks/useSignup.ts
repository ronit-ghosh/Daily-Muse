import axios, { isAxiosError } from "axios";
import URL from "../config/config";
import { useRecoilValue } from "recoil";
import { signupAtom } from "../store/recoil";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const values = useRecoilValue(signupAtom);
  const { firstname, lastname, username, bio, email, password } = values;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function sendReq() {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/api/v1/signup`, {
        firstname,
        lastname,
        username,
        bio,
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

export default useSignup;
