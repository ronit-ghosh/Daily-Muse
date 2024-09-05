import { IoCreate } from "react-icons/io5";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 pb-4 border-b">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl sm:text-3xl font-extrabold font-serif">Daily Muse</a>
            </div>
            <div className="rounded-lg cursor-pointer p-1 mr-6 font-bold flex sm:static sm:flex-row sm:text-sm flex-col fixed bottom-3 text-xs right-0 z-10">
            <IoCreate fontSize={35}/>
            <span className="hidden sm:block">Write Blog</span>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control relative">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
