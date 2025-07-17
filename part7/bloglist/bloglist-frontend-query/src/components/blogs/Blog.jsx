import { useParams } from 'react-router-dom'
import useHandleUser from '../../hooks/useHandleUser'
import { useBlogQuery } from '../../hooks/useBlogsQuery'

import Comments from '../comment/Comments'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import { Card, Typography } from '@material-tailwind/react'
  
const isBelong = (user) => {
  return (blog) => {
    if (!user.value) {
      return false
    }
    return user.value.username === blog.user.username
  }
}

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

  return (
    <div className="blog w-1/3 mx-auto my-36">
      <Card className='w-full h-auto py-12 px-12'>
        <Typography type='h2' className='mb-6' >
          {blog.title}
        </Typography>
        <div className='mx-2 my-4'>
          <Typography
            as='a'
            href={blog.url}
            className='p-2 italic font-thin text-lg'
          >
            {blog.url}
          </Typography>
          <Typography className='p-2 font-medium text-lg'>
            Added by {blog.author}
          </Typography>
          <Typography className='p-2 font-normal text-base flex items-center gap-2'>
            {blog.likes} likes
            <LikeButton blog={blog} />
          </Typography>
          {isBelongUser(blog) && <DeleteButton className='p-2' blog={blog} />}
        </div>
        <Comments blog={blog} />
      </Card>
    </div>
  )
}

export default Blog
