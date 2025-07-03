import Blog from './Blog'

const Blogs = ({ 
  blogs,
  handleUpdateBlog,
  handleRemoveBlog
}) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          handleUpdateBlog={handleUpdateBlog} 
          handleRemoveBlog={handleRemoveBlog}
        />
      )}
    </div>
  )
}

export default Blogs