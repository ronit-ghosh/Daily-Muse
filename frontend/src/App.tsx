import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import BlogPage from "./pages/BlogPage";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import CreateBlogRoute from "./routes/CreateBlogRoute";
import MyBlogs from "./pages/MyBlogs";
import MyBlogRoute from "./routes/MyBlogRoute";
import './app.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route element={<CreateBlogRoute />}>
            <Route path="/create" element={<CreateBlog />} />
          </Route>
          <Route element={<MyBlogRoute />}>
            <Route path="/user" element={<MyBlogs />} />
          </Route>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
