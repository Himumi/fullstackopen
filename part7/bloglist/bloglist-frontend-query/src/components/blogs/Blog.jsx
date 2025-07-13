import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useNotification from '../../hooks/useNotification'
import blogServices from '../../services/blogs'

const Blog = ({ blog, handleUpdate, handleRemoveBlog }) => {
  const [visible, setVisible] = useState(false)
  const { setSuccessNotification } = useNotification()

  const queryClient = useQueryClient()

  const onUpdateSuccess = blog => {
    setSuccessNotification(`liked ${blog.title}`, 3)
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.map(b => b.id !== blog.id ? b : blog))
  }

  const updateBlogMutation = useMutation({
    mutationFn: blogServices.update,
    onSuccess: onUpdateSuccess
  })

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

  handleUpdate ??= () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlogMutation.mutate(updateBlog)
  }

  const removeBlogHandler = () => handleRemoveBlog(blog)

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
        <button onClick={removeBlogHandler} className="removeButton">
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
