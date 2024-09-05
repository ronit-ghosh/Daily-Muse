import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const Blog = () => {
    const [blog, setBlog] = useState({})
    console.log(blog)
    const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL
    const [searchParams] = useSearchParams()
    const blogId = searchParams.get('id')
    console.log(blogId)
    const token = localStorage.getItem('dailymuse')
    useEffect(() => {
        try {
            axios.get(`${URL}/api/v1/blog/${blogId}`, { headers: { Authorization: `Bearer ${token}` }, params: { id: blogId } })
                .then(res => setBlog(res.data))
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <div className="">{JSON.stringify(blog)}</div>
        </>
    )
}

export default Blog
