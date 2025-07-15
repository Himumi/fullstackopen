import { Link } from 'react-router-dom'
import { useBlogsQuery } from '../../hooks/useBlogsQuery'

const Blogs = () => {
  const result = useBlogsQuery()

  if (result.isLoading) {
    return <div>loading data</div>
  }

  if (result.isError) {
    return <div>no result data</div>
  }

  const blogs = result.data

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
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
