import BlogsList from "./BlogsList"
import BlogForm from './BlogForm'
import Togglable from '../togglable/Togglable'

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