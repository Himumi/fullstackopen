import { useState } from 'react'
import helper from '../../helper/helper'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const titleHandler = helper.inputOnChangeHandler(setTitle)
  const authorHandler = helper.inputOnChangeHandler(setAuthor)
  const urlHandler = helper.inputOnChangeHandler(setUrl)

  const setHooks = helper.setHooksValue(
    setTitle, setAuthor, setUrl
  )

  const createBlogHandler = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title, author, url
    })
    setHooks('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlogHandler}>
        <div>
          title: 
          <input 
            type='text'
            name='Title'
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          author: 
          <input 
            type='text'
            name='Author'
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          url: 
          <input 
            type='text'
            name='Url'
            value={url}
            onChange={urlHandler}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm