import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../../reducers/blogs'
import helper from '../../helper/helper'

import useNotification from '../../hooks/useNotification'
import useInput from '../../hooks/useInput'

const BlogForm = () => {
  const {reset: resetTitle, ...title} = useInput('text')
  const {reset: resetAuthor, ...author} = useInput('text')
  const {reset: resetUrl, ...url} = useInput('text')
  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const dispatch = useDispatch()

  const resetValues = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const handleCreate = async event => {
    event.preventDefault()
    try {
      dispatch(createNewBlog({
        title: title.value,
        author: author.value,
        url: url.value
      }))
      setSuccessNotification(`Added ${title} by ${author}`, 3)
    } catch (error) {
      const field = error.response.data.error.match(/`\w+`/)
      setErrorNotification(`Missing ${field}`, 3)
    }
    resetValues()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            data-testid="titleInput"
            name="Title"
            {...title}
          />
        </div>
        <div>
          author:
          <input
            data-testid="authorInput"
            name="Author"
            {...author}
          />
        </div>
        <div>
          url:
          <input
            data-testid="urlInput"
            name="Url"
            {...url}
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
