
const Landing = () => {
    return (
        <>
            <div className="font-sans max-h-dvh w-full">
                <header className="border-b border-gray-200">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Daily Muse</h1>
                        <nav className="space-x-6">
                            <a href="#our-story" className="text-gray-600 hover:text-black">Our Story</a>
                            <a href="#membership" className="text-gray-600 hover:text-black">Membership</a>
                            <a href="#write" className="text-gray-600 hover:text-black">Write</a>
                            <a href="#sign-in" className="text-gray-600 hover:text-black">Sign In</a>
                        </nav>
                        <div>
                            <button className="bg-black text-white px-4 py-2 rounded">Get Started</button>
                        </div>
                    </div>
                </header>
                <section className="h-full py-20 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-5xl font-bold text-gray-900">Welcome to Daily Muse</h2>
                        <p className="text-2xl text-gray-700 mt-4">
                            A place to read, write, and connect.
                        </p>
                        <button className="mt-8 bg-black text-white px-6 py-3 rounded-full">Start Writing</button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Landing
