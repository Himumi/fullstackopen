import useQueryBlogs from '../../hooks/useQueryBlogs'
import Blog from './Blog'

const Blogs = () => {
  const result = useQueryBlogs()

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default Blogs
