import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Blog {
    title: string
    content: string,
    authorName: string,
    timestamp: string,
    blogId: string
}
const BlogCard = ({ title, content, authorName, timestamp, blogId }: Blog) => {
    const navigate = useNavigate()

    function handleBlogNavigation() {
        navigate(`/blogs/b?id=${blogId}`)
    }
    return (
        <>
            <div className="card bg-base-100 w-full rounded-none border-b border-gray-500 hover:scale-[1.01] transition-all ease-in-out duration-300">
                <div className="card-body">
                    <div className="flex items-center gap-3">
                        <span className="flex justify-center items-center font-extrabold border w-8 h-8 rounded-full uppercase">
                            {authorName.split('')[0]}
                        </span>
                        <span className="font-semibold">
                            {authorName}
                        </span>
                        <span>|</span>
                        <span className="text-sm font-thin font-mono tracking-tighter">
                            {timestamp.split('T')[0]}
                        </span>
                    </div>
                    <h2 className="card-title text-2xl sm:text-3xl font-extrabold">{title}</h2>
                    <p className="font-extralight line-clamp-3">{content}</p>
                    <div className="card-actions justify-between items-center text-xs">
                        <span className="shadow-xl px-2 py-1 rounded-lg">{Math.ceil(content.length / 1000)} minute(s) Read</span>
                        <button
                            onClick={handleBlogNavigation}
                            className="btn btn-ghost text-xs mt-3 w-full sm:w-40">Continue Reading <FaAngleDoubleRight /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard
