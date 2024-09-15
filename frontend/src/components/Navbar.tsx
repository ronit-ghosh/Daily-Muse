import { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { checkAuthAtom } from "../store/recoil";

interface Nav {
    isLanding?: boolean;
}

const Navbar = ({ isLanding }: Nav) => {
    return <>{isLanding ? <LandingNavbar /> : <ContentNavbar />}</>;
};
export default Navbar;

const LandingNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const navigateToBlogs = () => navigate("/blogs");
    const navigateToCreateBlogs = () => navigate("/create");
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <a className="flex title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0 cursor-pointer">
                        <img src={logo} alt="Logo" className="w-9 h-9" />
                        <span className="ml-3 text-2xl font-bold">Daily Muse</span>
                    </a>
                    <button className="text-gray-600 md:hidden" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
                <nav
                    className={`md:flex ${isOpen ? "block" : "hidden"
                        } md:items-center md:w-auto w-full`}
                >
                    <button
                        onClick={navigateToCreateBlogs}
                        className="block md:inline-block mr-5 hover:text-gray-900 hover:bg-green-100 py-1 px-2 rounded-md transition-all ease-in-out duration-200"
                    >
                        Create Blog
                    </button>
                    <button className="block md:inline-block mr-5 hover:text-gray-900 hover:bg-green-100 py-1 px-2 rounded-md transition-all ease-in-out duration-200">
                        About Us
                    </button>
                    <button className="block md:inline-block mr-5 hover:text-gray-900 hover:bg-green-100 py-1 px-2 rounded-md transition-all ease-in-out duration-200">
                        Tutorials
                    </button>
                </nav>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    <button
                        onClick={navigateToBlogs}
                        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    >
                        Explore Blogs
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

const ContentNavbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(checkAuthAtom);
    const navigateToCreateBlogs = () => navigate("/create");
    const navigateToMyBlogs = () => navigate("/user");
    const handleLogout = () => {
        localStorage.removeItem("dailymuse");
        navigate("/");
    };

    return (
        <header className="text-gray-600 body-font border-b">
            <div className="container mx-auto flex p-5 justify-center items-center">
                <a className="flex title-font font-medium items-center text-gray-900">
                    <img src={logo} alt="Logo" className="w-9 h-9" />
                </a>
                <nav className="mr-auto ml-4 py-1 pl-4 border-l border-gray-400 flex items-center text-base justify-center">
                    <button
                        onClick={navigateToCreateBlogs}
                        className="hover:bg-green-100 mr-1 py-1 px-2 rounded-md transition-all ease-in-out duration-200"
                    >
                        Create Blog
                    </button>
                    <button
                        onClick={navigateToMyBlogs}
                        className={`${isLoggedIn ? "block" : "hidden"
                            } hover:bg-green-100 mr-1 py-1 px-2 rounded-md transition-all ease-in-out duration-200`}
                    >
                        My Blogs
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`${isLoggedIn ? "block" : "hidden"
                            } hover:bg-green-100 mr-1 py-1 px-2 rounded-md transition-all ease-in-out duration-200`}
                    >
                        Log Out
                    </button>
                </nav>
            </div>
        </header>
    );
};
