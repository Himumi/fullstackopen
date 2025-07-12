import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../../reducers/blogs'
import { setNotification } from '../../reducers/notification'
import helper from '../../helper/helper'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const titleHandler = helper.inputOnChangeHandler(setTitle)
  const authorHandler = helper.inputOnChangeHandler(setAuthor)
  const urlHandler = helper.inputOnChangeHandler(setUrl)

  const setHooks = helper.setHooksValue(setTitle, setAuthor, setUrl)

  const setNotificationStatus = status => {
    return (message, second) => 
      dispatch(setNotification(status, message, second))
  } 

  const setSuccessNotification = setNotificationStatus('success')
  const setErrorNotification = setNotificationStatus('error')

  const handleCreate = async event => {
    event.preventDefault()
    try {
      dispatch(createNewBlog({
        title, author, url
      }))
      setSuccessNotification(`Added ${title} by ${author}`, 3)
    } catch (error) {
      const field = error.response.data.error.match(/`\w+`/)
      setErrorNotification(`Missing ${field}`, 3)
    }
    setHooks('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            data-testid="titleInput"
            type="text"
            name="Title"
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          author:
          <input
            data-testid="authorInput"
            type="text"
            name="Author"
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          url:
          <input
            data-testid="urlInput"
            type="text"
            name="Url"
            value={url}
            onChange={urlHandler}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
