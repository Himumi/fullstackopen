import Togglable from "./Togglable"
import BlogForm from "./blogs/BlogForm"
import BlogsList from "./blogs/BlogsList"

const Home = () => {
  return (
    <div>
      <Togglable textLabel="new blog" >
        <BlogForm />
      </Togglable>
      <BlogsList />
    </div>
  )
}

export default Home