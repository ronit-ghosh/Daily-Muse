import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { fetchBlogsBulk } from "../store/recoil";

interface blogsType {
  id: string;
  title: string;
  content: string;
  created: string;
  authorDetails: {
    firstname: string;
    lastname: string;
    username: string;
  };
}

const useFetchBlogsBulk = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentBlogs, setCurrentBlogs] = useState<blogsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsPerPage, setBlogsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const blogs = useRecoilValueLoadable(fetchBlogsBulk(currentPage));

  useEffect(() => {
    if (blogs.state == "loading") setLoading(true);
    else if (blogs.state == "hasValue") {
      setCurrentBlogs(blogs.contents.blogs);
      setBlogsPerPage(blogs.contents.blogCountPerReq);
      setTotalPages(Math.ceil(blogs.contents.totalBlogs / 5));
      setLoading(false);
    } else if (blogs.state == "hasError") {
      setLoading(false);
      console.error("Error while fetching blogs");
    }
  }, [blogs, currentPage]);

  return {
    currentPage,
    currentBlogs,
    loading,
    blogsPerPage,
    totalPages,
    handlePageChange,
  };
};

export default useFetchBlogsBulk;
