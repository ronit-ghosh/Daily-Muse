import { useRecoilValueLoadable } from "recoil"
import { useEffect, useState } from "react"
import { fetchUserBlogs } from "../store/recoil"

interface myBlogsTypes {
    id: string
    title: string
    content: string
    username: string
    created: string
}

const useFetchMyBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [userBlogs, setUserBlogs] = useState<myBlogsTypes[]>([])
    const username = localStorage.getItem('dailymuse-username')

    const blogs = useRecoilValueLoadable(fetchUserBlogs(username ?? ''))

    useEffect(() => {
        if (blogs.state == 'loading') setLoading(true)
        else if (blogs.state == 'hasValue') {
            setUserBlogs(blogs.contents.blogs)
            setLoading(false)
        } else if (blogs.state == 'hasError') (
            console.log("Error while fetching blogs!")
        )
    }, [blogs])

    return {
        loading,
        userBlogs
    }
}

export default useFetchMyBlogs
