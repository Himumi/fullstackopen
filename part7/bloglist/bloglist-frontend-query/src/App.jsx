import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/blogs/Blogs'
import BlogForm from './components/blogs/BlogForm'
import Togglable from './components/Togglable'

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const BlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = sortBlogs(blogs)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // notification handlers
  const setNotification = (func) => {
    return (message, time = 1) => {
      func.call(null, message)
      setTimeout(() => func.call(null, null), time * 1000)
    }
  }

  const setSuccessNotification = setNotification(setSuccessMsg)
  const setErrorNotification = setNotification(setErrorMsg)

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

  // create a new blog handler
  const createBlogHandler = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      const sortedBlogs = sortBlogs(blogs.concat(blog))
      setBlogs(sortedBlogs)

      setSuccessNotification(`Added ${blog.title} by ${blog.author}`, 3)
      BlogFormRef.current.toggleVisibility()
    } catch (error) {
      const field = error.response.data.error.match(/`\w+`/)
      setErrorNotification(`Missing ${field}`, 3)
    }
  }

  const updateBlogHandler = async (blogObject) => {
    try {
      const blog = await blogService.update(blogObject)

      const updatedBlogs = blogs.map((b) => (b.id === blog.id ? blog : b))
      const sortedBlogs = sortBlogs(updatedBlogs)
      setBlogs(sortedBlogs)
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

        const updatedBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
        const sortedBlogs = sortBlogs(updatedBlogs)
        setBlogs(sortedBlogs)
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
      <Notification errorMsg={errorMsg} successMsg={successMsg} />
      <div>
        <h2>blogs</h2>
        <div>
          <span>{user.name} logged in</span>
          <button onClick={logoutHandler}>logout</button>
        </div>
        <Togglable textLabel="new blog" ref={BlogFormRef}>
          <BlogForm handleCreateBlog={createBlogHandler} />
        </Togglable>
        <Blogs
          handleUpdateBlog={updateBlogHandler}
          handleRemoveBlog={deleteBlogHandler}
          blogs={blogs}
        />
      </div>
    </div>
  )
}

export default App
