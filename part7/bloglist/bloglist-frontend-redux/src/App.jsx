import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/blogs/BlogForm'
import Blogs from './components/blogs/Blogs'

import useNotification from './hooks/useNotification'
import { useSelector, useDispatch } from 'react-redux'
import { set, deleteAllUserInfo } from './reducers/user'

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const App = () => {
  const user = useSelector(state => state.user)
  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()
  const BlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(set(user))
      blogService.setToken(user.token)
    }
  }, [])

  // logout handler
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
