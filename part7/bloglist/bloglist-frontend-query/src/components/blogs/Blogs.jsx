import { Outlet } from "react-router-dom"
import useQueryBlogs from "../../hooks/useQueryBlogs"

import Togglable from '../Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const result = useQueryBlogs()

  if (result.isLoading) {
    return <div>loading data..</div>
  }

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