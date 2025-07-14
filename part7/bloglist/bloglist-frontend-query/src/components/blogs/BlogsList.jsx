import { useQueryClient } from '@tanstack/react-query'

const Blogs = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>{blog.title}</div>
      ))}
    </div>
  )
}

export default Blogs
