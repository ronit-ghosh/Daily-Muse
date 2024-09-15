import axios, { isAxiosError } from "axios"
import URL from "../config/config"
import { useState } from "react"

const useDeleteBlog = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const token = localStorage.getItem('dailymuse')

    async function sendReq(blogId: string) {
        try {
            setLoading(true)
            const response = await axios.post(`${URL}/api/v1/blog/delete`, { blogId }, { headers: { Authorization: `Bearer ${token}` } })
            setSuccess(response.data.msg)
            setLoading(false)
            window.location.reload()
        } catch (error) {
            if (isAxiosError(error)) {
                setError(error.response?.data.msg)
                setLoading(false)
            }
        }
    }
    return {
        loading,
        success,
        sendReq,
        error
    }
}

export default useDeleteBlog
