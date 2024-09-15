import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import useFetchBlogsBulk from "../hooks/useFetchBlogsBulk";
import { useSearchParams } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

const Blogs = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const {
    currentPage,
    currentBlogs,
    loading,
    blogsPerPage,
    totalPages,
    handlePageChange,
  } = useFetchBlogsBulk(page);
  const { } = useCheckAuth();

  return (
    <>
      <Navbar />
      {loading
        ? Array.from({ length: blogsPerPage }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))
        : currentBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blogId={blog.id}
            title={blog.title}
            content={blog.content}
            timestamp={blog.created}
            firstname={blog.authorDetails.firstname}
            lastname={blog.authorDetails.lastname}
            username={blog.authorDetails.username}
          />
        ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
};

export default Blogs;
