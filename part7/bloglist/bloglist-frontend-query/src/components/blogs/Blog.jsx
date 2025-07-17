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
  
  const isBelong = (user) => {
    return (blog) => {
      if (!user.value) {
        return false
      }
      return user.value.username === blog.user.username
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
