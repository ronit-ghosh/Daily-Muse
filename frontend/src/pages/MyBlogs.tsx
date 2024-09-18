import MyBlogCard from "../components/MyBlogCard"
import useCheckAuth from "../hooks/useCheckAuth";
import Navbar from "../components/Navbar";
import MyBlogCardSkeleton from "../components/MyBlogCardSkeleton";
import useFetchMyBlogs from "../hooks/useFetchMyBlogs";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
    const { } = useCheckAuth();
    const navigate = useNavigate();
    const navigateToCreateBlog = () => navigate('/create')
    const { loading, userBlogs } = useFetchMyBlogs();

    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {
                            loading ?
                                <>
                                    <MyBlogCardSkeleton />
                                    <MyBlogCardSkeleton />
                                    <MyBlogCardSkeleton />
                                </> :
                                userBlogs.length === 0 ?
                                    <div className="w-full text-center">You haven't posted anything yet. Want to <span onClick={navigateToCreateBlog} className="underline underline-offset-1 cursor-pointer">Create a Blog?</span>
                                    </div> :
                                    userBlogs.map(blog => <MyBlogCard
                                        key={blog.id}
                                        blogId={blog.id}
                                        title={blog.title}
                                        content={blog.content}
                                        timestamp={blog.created} />)
                        }

                    </div>
                </div>
            </section>


        </>
    )
}

export default MyBlogs
