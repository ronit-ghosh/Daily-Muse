import Blog from "../components/Blog";
import BlogPageSkeleton from "../components/BlogPageSkeleton";
import useCheckAuth from "../hooks/useCheckAuth";
import useFetchBlog from "../hooks/useFetchBlog";

const BlogPage = () => {
  const { blogData, currentBlog, loading } = useFetchBlog();
  const { } = useCheckAuth();

  return (
    <>
      {loading ? (
        <BlogPageSkeleton />
      ) : (
        <Blog
          title={currentBlog.title}
          content={currentBlog.content}
          timestamp={currentBlog.created}
          firstname={blogData?.blog.User.firstname ?? ""}
          lastname={blogData?.blog.User.lastname ?? ""}
          username={blogData?.blog.User.username ?? ""}
          bio={blogData?.blog.User.bio ?? ""}
        />
      )}
    </>
  );
};

export default BlogPage;
