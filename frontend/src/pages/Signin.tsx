import { useState } from "react"
import AuthPageHeader from "../components/AuthPageHeader"
import InputBox from "../components/InputBox"
import { SigninValidation } from "@ronit-ghosh/daily-muse-common"
import axios, { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const [signinInputs, setSigninInputs] = useState<SigninValidation>({
        email: "",
        password: ""
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function sendReq() {
        const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL

        try {
            setLoading(true)
            const res = await axios.post(`${URL}/api/v1/signin`, {
                email: signinInputs.email,
                password: signinInputs.password,
            })
            const token = res.data.token
            localStorage.setItem('dailymuse', token)
            setLoading(false)
            setError('')
            navigate('/blogs')
        } catch (error) {
            if (isAxiosError(error)) {
                setError(error.response?.data.msg || "Unknown Error Occured!")
                setTimeout(() => {
                    setError('')
                }, 5000)
                setLoading(false)
            }
        }
    }
    
    return (
        <>
            <div className="h-dvh flex flex-col justify-center items-center gap-2">
                <AuthPageHeader text='Login to Your Account' type="signin" />
                <div className="text-red-500 font-mono w-96 h-6 text-center">{error}</div>
                <InputBox label='email' placeholder='email' type='email' onChange={(e) => {
                    setSigninInputs({
                        ...signinInputs,
                        email: e.target.value
                    })
                }} />
                <InputBox label='password' placeholder='password' type='password' onChange={(e) => {
                    setSigninInputs({
                        ...signinInputs,
                        password: e.target.value
                    })
                }} />
                <button onClick={sendReq} className="btn btn-accent text-lg font-bold">
                    {
                        loading ?
                            <div className="w-8 h-8 border-4 border-transparent text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"></div> :
                            <div>Login</div>
                    }
                </button>
            </div>
        </>
    )
}

export default Signin
