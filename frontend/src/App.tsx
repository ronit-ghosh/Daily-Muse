import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Blogs from './pages/Blogs'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Blog from './pages/Blog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/blogs/b' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
