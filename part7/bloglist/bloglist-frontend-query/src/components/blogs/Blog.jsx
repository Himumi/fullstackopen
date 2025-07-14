import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogServices from '../../services/blogs'
import useUser from '../../hooks/useUser'
import useNotification from '../../hooks/useNotification'

const Blog = ({ handleUpdate, handleRemove }) => {
  const { setSuccessNotification } = useNotification()

  const id = useParams().id
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const blog = blogs.find(blog => blog.id === id)
  const loggedUser = useUser()

  const onUpdateSuccess = blog => {
    setSuccessNotification(`liked ${blog.title}`, 3)
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.map(b => b.id !== blog.id ? b : blog))
  }

  const updateBlogMutation = useMutation({
    mutationFn: blogServices.update,
    onSuccess: onUpdateSuccess
  })

  const onRemoveSuccess = () => {
    setSuccessNotification(`removed ${blog.title}`, 3)
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id))
  }

  const removeBlogMutation = useMutation({
    mutationFn: blogServices.remove,
    onSuccess: onRemoveSuccess
  })

  handleUpdate ??= () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlogMutation.mutate(updateBlog)
  }

  handleRemove ??= () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (confirm) {
      removeBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button onClick={handleUpdate}>like</button> <br />
        Added by {blog.author} <br />
        {loggedUser.value.username !== blog.user
          ? null
          : <button onClick={handleRemove}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
