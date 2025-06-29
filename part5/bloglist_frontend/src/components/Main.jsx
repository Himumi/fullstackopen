import Blogs from './blogs/Blogs'
import BlogForm from './blogs/BlogForm'
import Togglable from './Togglable'

const Main = ({ 
  blogs,
  user,
  handleLogout,
  handleCreateBlog 
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>  
      </p>
      <Togglable textLabel='new blog'>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default Main