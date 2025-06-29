import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Main from './components/Main'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      setTimeout(() => func.call(null, null), time*1000)
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
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )
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
      setBlogs(blogs.concat(blog))

      setSuccessNotification(`Added ${blog.title} by ${blog.author}`, 3)
    } catch (error) {
      const field = error.response.data.error.match(/`\w+`/)
      setErrorNotification(`Missing ${field}`, 3)
    }
  }

  return (
    <div>
      <Notification 
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
      {!user 
        ? <LoginForm handleLogin={loginHandler} /> 
        : 
          <Main 
            blogs={blogs}
            user={user}
            handleCreateBlog={createBlogHandler}
            handleLogout={logoutHandler}
          />     
      }
    </div>
  )
}

export default App