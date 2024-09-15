import { useNavigate } from "react-router-dom";

interface BlogCardTypes {
  blogId: string;
  title: string;
  content: string;
  timestamp: string;
  firstname: string;
  lastname: string;
  username: string;
}

const BlogCard = (props: BlogCardTypes) => {
  const navigate = useNavigate();
  const { blogId, title, content, timestamp, firstname, lastname, username } =
    props;
  const date = timestamp.split("T")[0].split("-").reverse().join("-");

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 md:px-12 py-6 border-b border-b-green-100 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="py-8 flex flex-wrap md:flex-nowrap md:flex-row flex-col">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-gray-700 uppercase">
                {firstname + " " + lastname}
              </span>
              <span className="text-sm title-font text-gray-700">
                @{username}
              </span>
              <span className="mt-1 text-gray-500 text-sm">{date}</span>
            </div>
            <div className="md:flex-grow">
              <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                {title}
              </h2>
              <p className="leading-relaxed line-clamp-3 lg:line-clamp-2">
                {content}
              </p>
              <button
                onClick={() => navigate(`/blog/${blogId}`)}
                className="text-green-500 inline-flex items-center mt-4 py-2 px-4 border border-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all ease-in-out duration-200"
              >
                Continue reading
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
