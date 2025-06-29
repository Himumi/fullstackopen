import { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => setVisible(!visible)

  const updateLikeHandler = () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    handleUpdateBlog(updateBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        <div style={showWhenVisible}>
          {blog.url} <br />
          likes {blog.likes} 
          <button onClick={updateLikeHandler}>like</button> <br />
          {blog.author}
        </div>
      </div>
    </div>
  )
}

export default Blog