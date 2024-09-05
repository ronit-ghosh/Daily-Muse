import { Link } from "react-router-dom"

interface Auth {
    text: string
    type: 'signin' | 'signup'
}

const AuthPageHeader = ({ text, type }: Auth) => {

    return (
        <>
            <h1 className="text-4xl mb-2 font-extrabold tracking-wide text-center">{text}</h1>
            <div className="flex gap-1">
                <span className="text-sm">
                    {
                        type === 'signin' ?
                            "Don't have an account?" :
                            "Already have an account?"
                    }
                </span>
                <span className="underline underline-offset-[1.5px] hover:opacity-80 cursor-pointer text-sm">
                    {
                        type === 'signin' ?
                            <Link to={'/signup'}>Signup</Link> :
                            <Link to={'/signin'}>Signin</Link>
                    }
                </span>
            </div>
        </>
    )
}

export default AuthPageHeader
