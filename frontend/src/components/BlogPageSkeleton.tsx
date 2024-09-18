const BlogPageSkeleton = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pb-24 pt-10 mx-auto">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto h-[80dvh]">
          <div className="animate-pulse">
            <div className="mb-2 bg-slate-300 w-full h-7 rounded-md"></div>
            <div className="mb-4 bg-slate-300 w-full h-7 rounded-md"></div>
            <div className="mb-4 mx-auto bg-slate-300 w-1/3 h-5 rounded-md"></div>
            <div className="mx-auto bg-slate-300 w-1/5 h-5 rounded-md"></div>
            <div className="mx-auto bg-slate-300 w-1/4 h-5 rounded-md mt-2"></div>
            <span className="inline-block h-1 w-full rounded bg-slate-300 my-6"></span>
            <div className="w-full h-96 bg-slate-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPageSkeleton;
