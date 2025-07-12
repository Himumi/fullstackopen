import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Blogs from './blogs/Blogs'
import BlogForm from './blogs/BlogForm'
import Togglable from './Togglable'

// eslint-disable-next-line react/display-name
const Main = forwardRef((props, ref) => {
  const {
    user,
    handleLogout,
    handleCreateBlog,
    handleRemoveBlog,
    handleUpdateBlog,
    blogs
  } = props

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable textLabel="new blog" ref={ref}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <Blogs
        handleUpdateBlog={handleUpdateBlog}
        handleRemoveBlog={handleRemoveBlog}
        blogs={blogs}
      />
    </div>
  )
})

Main.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleCreateBlog: PropTypes.func.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Main
