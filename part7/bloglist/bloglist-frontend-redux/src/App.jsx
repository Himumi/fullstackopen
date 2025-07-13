import { useRef } from 'react'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/blogs/BlogForm'
import Blogs from './components/blogs/Blogs'

import useNotification from './hooks/useNotification'
import useGetUserFromLocal from './hooks/useGetUserFromLocal'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllUserInfo } from './reducers/user'

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const App = () => {
  const user = useSelector(state => state.user)
  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()
  const BlogFormRef = useRef()
  const dispatch = useDispatch()

  // Retrieve user info from local storage
  useGetUserFromLocal()

  const handleLogout = () => {
    dispatch(deleteAllUserInfo())
    setSuccessNotification('Logged out', 3)
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      <Notification />
      
      <div>
        <h2>blogs</h2>
        <div>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable textLabel="new blog" ref={BlogFormRef}>
          <BlogForm />
        </Togglable>
        <Blogs />
      </div>

    </div>
  )
}

export default App
