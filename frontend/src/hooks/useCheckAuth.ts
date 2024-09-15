import { useSetRecoilState } from "recoil";
import { checkAuthAtom } from "../store/recoil";
import axios, { isAxiosError } from "axios";
import URL from "../config/config";
import { useEffect, useState } from "react";

const useCheckAuth = () => {
  const setIsLoggedIn = useSetRecoilState(checkAuthAtom);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("dailymuse");

  useEffect(() => {
    if (token) {
      try {
        setLoading(true)
        axios
          .post(`${URL}/api/v1/me`, null, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setSuccess(response.data.msg);
            setIsLoggedIn(true);
          });
        setLoading(false)
      } catch (error) {
        if (isAxiosError(error)) setIsLoggedIn(false);
        setLoading(false)
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false)
    }
  }, [token]);
  return {
    success,
    loading
  };
};

export default useCheckAuth;
