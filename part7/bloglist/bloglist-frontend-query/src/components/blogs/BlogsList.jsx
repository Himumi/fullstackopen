import { Link } from 'react-router-dom'
import { useBlogsQuery } from '../../hooks/useBlogsQuery'
import { Typography } from '@material-tailwind/react'

const Blogs = () => {
  const result = useBlogsQuery()

  if (result.isLoading) {
    return <div>loading data</div>
  }

  if (result.isError) {
    return <div>no result data</div>
  }

  const blogs = result.data

  return (
    <div className='grid gap-1 m-12'>
      {blogs.map((blog) => (
        <div key={blog.id} className='hover:bg-slate-100 w-full h-16 border rounded-lg'>
          <Link to={`/blogs/${blog.id}`} >
            <Typography type='h5' className='ml-5 py-3'>
              {blog.title}
            </Typography>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
