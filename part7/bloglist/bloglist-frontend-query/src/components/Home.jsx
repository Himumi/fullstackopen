import Togglable from "./Togglable"
import BlogForm from "./blogs/BlogForm"
import Blogs from "./blogs/Blogs"

const Home = () => {
  return (
    <div>
      <Togglable textLabel="new blog" >
        <BlogForm />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default Home