const BlogCardSkeleton = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 md:px-12 py-6 border-b border-b-green-100 mx-auto w-full">
        <div className="animate-pulse flex flex-col md:flex-row">
          <div className="flex flex-col gap-2">
            <div className="w-32 h-6 bg-slate-300 rounded-md"></div>
            <div className="w-24 h-5 bg-slate-300 rounded-md"></div>
          </div>
          <div className="md:ml-32 md:mt-0 mt-6 w-full">
            <div className="w-5/6 h-7 bg-slate-300 rounded-md"></div>
            <div className="w-full h-7 bg-slate-300 rounded-md mt-4"></div>
            <div className="w-11/12 h-7 bg-slate-300 rounded-md mt-2"></div>
            <div className="w-48 h-9 bg-slate-300 rounded-full mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCardSkeleton;
