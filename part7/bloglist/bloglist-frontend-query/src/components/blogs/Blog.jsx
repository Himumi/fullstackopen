import { useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import useNotification from '../../hooks/useNotification'
import { useBlogQuery, useBlogsMutation } from '../../hooks/useBlogsQuery'

const Blog = () => {
  const loggedUser = useUser()
  const result = useBlogQuery(useParams().id)
  const blogsMutation = useBlogsMutation()

  const {
    setSuccessNotification,
    setErrorNotification,
  } = useNotification()

  if (result.isLoading) {
    return <div>loading data</div>
  }

  if (result.isError) {
    return <div>no return data</div>
  }

  const blog = result.data

  const handleUpdate = () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogsMutation.update.mutate(updateBlog, {
      onSuccess: (result, variable, context) => {
        setSuccessNotification(`Liked ${variable.title}`, 3)
      },
      onError: (error, variable, context) => {
        console.log(error)
        setErrorNotification(`Failed updating ${variable.title}`, 3)
      }
    })
  }

  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (confirm) {
      blogsMutation.delete.mutate(blog, {
        onSuccess: (result, variable, context) => {
          setSuccessNotification(`removed ${variable.title}`, 3)
        },
        onError: (error, variable, context) => {
          console.log(error)
          setErrorNotification(`Failed deleting ${variable.title}`, 3)
        }
      })
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
          : <button onClick={handleDelete}>delete</button>
        }
      </div>
    </div>
  )
}

export default Blog
