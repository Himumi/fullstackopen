import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateBlog, removeBlog } from '../../reducers/blogs'
import { setNotification } from '../../reducers/notification'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const setNotificationStatus = status => {
    return (message, second) => 
      dispatch(setNotification(status, message, second))
  } 

  const setSuccessNotification = setNotificationStatus('success')
  const setErrorNotification = setNotificationStatus('error')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setVisible(!visible)

  const handleUpdate = async () => {
    try {
      dispatch(updateBlog({
        ...blog, likes: blog.likes + 1
      })) 
      setSuccessNotification(`Liked ${blog.title}`, 3)
    } catch (error) {
      setErrorNotification('failed to add blog', 3)
    }
  }

  const handleRemove = async () => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      )

      if (confirm) {
        dispatch(removeBlog(blog))
        setSuccessNotification(`Removed ${blog.title}`, 3)
      }
    } catch (error) {
      setErrorNotification('Failed to delete Blog', 3)
    }
  }

  const blogAuthor = visible ? '' : `by ${blog.author}`
  const blogTitle = `${blog.title} ${blogAuthor}`

  return (
    <div style={blogStyle} className="blog">
      <span>{blogTitle}</span>
      <button onClick={toggleVisibility} className="hiddenButton">
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className="hiddenContent">
        <span>
          {blog.url} <br />
        </span>
        <span>likes {blog.likes}</span>
        <button onClick={handleUpdate} className="likeButton">
          like
        </button>{' '}
        <br />
        <span>
          {blog.author} <br />
        </span>
        <button onClick={handleRemove} className="removeButton">
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
