import Togglable from "./Togglable"
import BlogForm from "./blogs/BlogForm"
import BlogsList from "./blogs/BlogsList"

import useQueryBlogs from "../hooks/useQueryBlogs"

const Home = () => {
  const result = useQueryBlogs()

  if (result.isLoading) {
    return <div>loading data...</div>
  }

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