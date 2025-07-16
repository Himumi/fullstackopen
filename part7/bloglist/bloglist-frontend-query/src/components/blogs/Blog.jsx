import { useParams } from 'react-router-dom'
import useHandleUser from '../../hooks/useHandleUser'
import { useBlogQuery } from '../../hooks/useBlogsQuery'

import Comments from '../comment/Comments'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const Blog = () => {
  const loggedInUser = useHandleUser()
  const isBelongUser = isBelong(loggedInUser)
  const result = useBlogQuery(useParams().id)

  if (result.isLoading) {
    return <div>loading data</div>
  }

  if (result.isError) {
    return <div>no return data</div>
  }

  const blog = result.data
  console.log('blog', blog)

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
        {blog.likes} likes <LikeButton blog={blog} /> <br />
        Added by {blog.author} <br />
        {isBelongUser(blog) && <DeleteButton blog={blog} />}
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
