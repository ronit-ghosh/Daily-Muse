import { CreateBlogValidation } from "@ronit-ghosh/daily-muse-common";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import URL from "../config/config";
import { useNavigate } from "react-router-dom";

const useCreateBlog = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<CreateBlogValidation>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("dailymuse");

  async function sendReq() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${URL}/api/v1/blog`,
        {
          title: values.title,
          content: values.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.msg);
      const blogId = response.data.id;
      navigate(`/blog/${blogId}`);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.msg);
        setLoading(false);
      }
    }
  }
  return {
    values,
    setValues,
    sendReq,
    success,
    loading,
    error,
  };
};

export default useCreateBlog;
