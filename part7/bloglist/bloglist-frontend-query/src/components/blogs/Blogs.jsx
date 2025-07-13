import Blog from './Blog'
import { useQuery } from '@tanstack/react-query'
import blogServices from '../../services/blogs'

const Blogs = ({ handleUpdateBlog, handleRemoveBlog }) => {
  const result =  useQuery({
    queryKey: ['blogs'],
    queryFn: blogServices.getAll 
  })

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
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
