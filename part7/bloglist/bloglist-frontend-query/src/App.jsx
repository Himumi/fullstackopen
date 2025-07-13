import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/blogs/Blogs'
import BlogForm from './components/blogs/BlogForm'
import Togglable from './components/Togglable'

import useNotification from './hooks/useNotification'

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const App = () => {
  const [user, setUser] = useState(null)
  const { 
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const BlogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // login handler
  const loginHandler = async (loginInfo) => {
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
  const logoutHandler = () => {
    // delete all user information from app
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.deleteToken()

    setSuccessNotification('Logged out', 3)
  }

  const updateBlogHandler = async (blogObject) => {
    try {
      const blog = await blogService.update(blogObject)

    } catch (error) {
      console.log(error)
      setErrorNotification('failed to add blog', 3)
    }
  }

  const deleteBlogHandler = async (blogObject) => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.author}`
      )

      if (confirm) {
        await blogService.remove(blogObject.id)

      }
    } catch (error) {
      setErrorNotification('Failed to delete Blog', 3)
    }
  }

  if (!user) {
    return <LoginForm handleLogin={loginHandler} />
  }

  return (
    <div>
      <Notification />
      <div>
        <h2>blogs</h2>
        <div>
          <span>{user.name} logged in</span>
          <button onClick={logoutHandler}>logout</button>
        </div>
        <Togglable textLabel="new blog" ref={BlogFormRef}>
          <BlogForm />
        </Togglable>
        <Blogs
          handleUpdateBlog={updateBlogHandler}
          handleRemoveBlog={deleteBlogHandler}
        />
      </div>
    </div>
  )
}

export default App
