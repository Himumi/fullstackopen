import { useState } from 'react'

const Blog = ({
  blog,
  handleUpdateBlog,
  handleRemoveBlog
}) => {
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

  const removeBlogHandler = () => handleRemoveBlog(blog)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {!visible && `by ${blog.author}`}
        <button onClick={toggleVisibility} className='hiddenButton'>{visible ? 'hide' : 'view'}</button>
        <div style={showWhenVisible} className='hiddenContent'>
          {blog.url} <br />
          likes {blog.likes}
          <button onClick={updateLikeHandler} className='likeButton'>like</button> <br />
          {blog.author} <br />
          <button onClick={removeBlogHandler} className='removeButton'>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog