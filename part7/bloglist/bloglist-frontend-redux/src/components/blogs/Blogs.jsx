import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { initializeBlogs } from '../../reducers/blogs'

const Blogs = ({ handleRemoveBlog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []) 
  
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
