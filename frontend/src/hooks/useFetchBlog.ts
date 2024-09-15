import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { fetchBlog } from "../store/recoil";

interface blogtype {
  title: string;
  content: string;
  created: string;
}

interface blogData {
  msg: string;
  blog: {
    title: string;
    content: string;
    created: string;
    User: {
      firstname: string;
      lastname: string;
      username: string;
      bio: string;
    };
  };
}

const useFetchBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<blogData>();
  const [currentBlog, setCurrentBlog] = useState<blogtype>({
    title: "",
    content: "",
    created: "",
  });
  const [loading, setLoading] = useState(true);

  const blog = useRecoilValueLoadable(fetchBlog(id ?? ""));

  useEffect(() => {
    if (blog.state == "loading") setLoading(true);
    else if (blog.state == "hasValue") {
      setCurrentBlog(blog.contents.blog);
      setBlogData(blog.contents);
      setLoading(false);
    } else if (blog.state == "hasError") {
      setLoading(false);
      console.error("Error while fetching blog");
    }
  }, [blog, currentBlog]);

  return {
    blogData,
    currentBlog,
    loading,
  };
};

export default useFetchBlog;
