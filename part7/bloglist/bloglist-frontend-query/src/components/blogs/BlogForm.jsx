import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import helper from '../../helper/helper'
import blogServices from '../../services/blogs'
import useNotification from '../../hooks/useNotification'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { setSuccessNotification } = useNotification()
  const queryClient = useQueryClient()
  
  const handleSuccess =  blog => {
    setSuccessNotification(`Added ${blog.title} by ${blog.author}`, 3)
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.concat(blog))
  }

  const newBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: handleSuccess,
  })

  const titleHandler = helper.inputOnChangeHandler(setTitle)
  const authorHandler = helper.inputOnChangeHandler(setAuthor)
  const urlHandler = helper.inputOnChangeHandler(setUrl)

  const setHooks = helper.setHooksValue(setTitle, setAuthor, setUrl)

  handleCreate ??= (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
      title, author, url
    })
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
