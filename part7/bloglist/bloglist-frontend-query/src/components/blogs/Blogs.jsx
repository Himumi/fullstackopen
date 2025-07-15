import { Outlet } from "react-router-dom"

import BlogsList from "./BlogsList"
import BlogForm from './BlogForm'
import Togglable from '../Togglable'

const Blogs = () => {
  return (
    <div>
      <Togglable textLabel="new blog">
        <BlogForm />
      </Togglable>
      <BlogsList />
    </div>
  )
}

export default Blogs