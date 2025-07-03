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

  const blogAuthor = visible ? '' : `by ${blog.author}`
  const blogTitle = `${blog.title} ${blogAuthor}`

  return (
    <div style={blogStyle} className='blog'>
      <span>{blogTitle}</span>
      <button onClick={toggleVisibility} className='hiddenButton'>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='hiddenContent'>
        <span>{blog.url} <br /></span>
        <span>likes {blog.likes}</span>
        <button onClick={updateLikeHandler} className='likeButton'>like</button> <br />
        <span>{blog.author} <br /></span>
        <button onClick={removeBlogHandler} className='removeButton'>remove</button>
      </div>
    </div>
  )
}

export default Blog
