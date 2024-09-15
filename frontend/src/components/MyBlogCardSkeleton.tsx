
const MyBlogCardSkeleton = () => {
    return (
        <div className="animate-pulse p-4 lg:w-1/3">
            <div className="h-full bg-slate-100 px-8 pt-6 rounded-lg flex flex-col items-center">
                <div className="bg-slate-300 w-40 h-3 rounded-md mb-4"></div>
                <div className="bg-slate-300 w-full h-7 rounded-md"></div>
                <div className="bg-slate-300 w-11/12 h-7 rounded-md mt-1"></div>
                <div className="bg-slate-300 w-11/12 h-4 rounded-md mt-6"></div>
                <div className="bg-slate-300 w-11/12 h-4 rounded-md mt-1"></div>
                <div className="bg-slate-300 w-full h-4 rounded-md mt-1"></div>
                <div className="bg-slate-300 w-32 h-9 rounded-full mt-4"></div>
                <div className="flex my-9 gap-3">
                    <div className="bg-slate-300 w-32 h-9 rounded-full"></div>
                    <div className="bg-slate-300 w-32 h-9 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default MyBlogCardSkeleton
