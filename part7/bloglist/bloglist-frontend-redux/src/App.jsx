import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/blogs/BlogForm'
import Blogs from './components/blogs/Blogs'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notification'

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const App = () => {
  const [user, setUser] = useState(null)
  const BlogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const dispatch = useDispatch()
  const setNotificationStatus = status => {
    return (message, second) => 
      dispatch(setNotification(status, message, second))
  } 

  const setSuccessNotification = setNotificationStatus('success')
  const setErrorNotification = setNotificationStatus('error')

  // login handler
  const handleLogin = async (loginInfo) => {
    try {
      // login user
      const user = await loginService.login(loginInfo)

      // add user information to app
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setSuccessNotification('Logged in', 3)
    } catch (error) {
      setErrorNotification('Wrong username or password', 3)
    }
  }

  // logout handler
  const handleLogout = () => {
    // delete all user information from app
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.deleteToken()

    setSuccessNotification('Logged out', 3)
  }

  const handleRemoveBlog = async (blogObject) => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.author}`
      )

      if (confirm) {
        await blogService.remove(blogObject.id)

        const updatedBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
        const sortedBlogs = sortBlogs(updatedBlogs)
        setSuccessNotification(`Removed ${blogObject.title}`, 3)
      }
    } catch (error) {
      setErrorNotification('Failed to delete Blog', 3)
    }
  }

  if (!user) {
    return <LoginForm handleLogin={handleLogin} />
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
        <Blogs
          handleRemoveBlog={handleRemoveBlog}
        />
      </div>

    </div>
  )
}

export default App
