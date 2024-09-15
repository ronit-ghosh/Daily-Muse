import { useNavigate } from "react-router-dom"
import useDeleteBlog from "../hooks/useDeleteBlog"

interface myBlogsTypes {
  blogId: string
  title: string
  content: string
  timestamp: string
}

const MyBlogCard = (props: myBlogsTypes) => {
  const navigate = useNavigate()
  const { blogId, title, content, timestamp } = props
  const { loading, sendReq } = useDeleteBlog()
  const date = timestamp.split('T')[0].split('-').reverse().join('-')
  const time = timestamp.split('T')[1].split('.')[0]

  return (
    <div className="p-4 lg:w-1/3">
      <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-20 rounded-lg overflow-hidden text-center relative">
        <span className="">
          <span className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Last edited: {date}</span>
          <span className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ml-2">{time}</span>
        </span>
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 line-clamp-2">{title}</h1>
        <p className="leading-relaxed mb-3 line-clamp-3">{content}</p>
        <button
          onClick={() => navigate(`/blog/${blogId}`)}
          className="text-green-500 inline-flex items-center px-4 py-2 rounded-full border border-green-500 hover:bg-green-500 hover:text-gray-50 transition-all ease-in-out duration-200">
          Open Blog
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <div className="text-center flex justify-center gap-3 absolute bottom-0 left-0 w-full py-4">
          <button className="text-gray-500 inline-flex items-center px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-500 hover:text-gray-50 transition-all ease-in-out duration-200">
            Update Blog
          </button>
          <button
            onClick={() => sendReq(blogId)}
            className="text-red-500 inline-flex items-center px-4 py-2 rounded-full border border-red-500 hover:bg-red-500 hover:text-gray-50 transition-all ease-in-out duration-200">
            {
              loading ?
                <span>...</span> :
                <span>Delete Blog</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyBlogCard
