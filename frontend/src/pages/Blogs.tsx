import { useMemo, useState } from "react"
import BlogCard from "../components/BlogCard"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Pagination from "../components/Pagination"
import axios from "axios"

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // TODO: Use atomfamily or selectorfamily
    useMemo(() => {
        const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL
        axios.get(`${URL}/api/v1/blog/bulk`, { params: { page: currentPage, limit: 5 } })
            .then(res => {
                setBlogs(res.data.blogs)
                setTotalPages(Math.ceil(res.data.totalBlogs / 5))
            }).catch(err => console.log(err))
    }, [currentPage])

    function handlePageChange(page: number) {
        setCurrentPage(page)
    }

    interface authorDetails {
        username: string
    }
    
    interface blogsType {
        id: string
        title: string
        content: string
        authorDetails: authorDetails
        created: string
        blogId: string
    }

    return (
        <>
            <Navbar />
            <div className="w-full px-0 sm:px-24 mt-10 flex flex-col gap-2">
                {
                    blogs.map((blog: blogsType) => <BlogCard key={blog.id} title={blog.title} content={blog.content} authorName={blog.authorDetails.username} timestamp={blog.created} blogId={blog.id} />)
                }
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <Footer />
        </>
    )
}

export default Blogs
