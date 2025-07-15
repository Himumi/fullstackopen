import { Outlet } from "react-router-dom"

import Togglable from '../Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  return (
    <div>
      <Togglable textLabel="new blog" >
        <BlogForm />
      </Togglable>
      <Outlet />
    </div>
  )
}

export default Blogs