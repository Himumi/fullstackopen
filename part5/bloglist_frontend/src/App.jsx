import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  // input onChange handlers
  const inputOnChangeHandler = (func) => {
    return ({ target }) => func.call(null, target.value)
  }

  const usernameHandler = inputOnChangeHandler(setUsername)
  const passwordHandler = inputOnChangeHandler(setPassword)
  const titleHandler = inputOnChangeHandler(setTitle)  
  const authorHandler = inputOnChangeHandler(setAuthor)
  const urlHandler = inputOnChangeHandler(setUrl)

  const setHooksValue = (value, ...funcs) => {
    funcs.forEach(func => func.call(null, value))
  }

  // login handler
  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      // login user
      const user = await loginService.login({
        username, password
      }) 

      // add user information to app
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setHooksValue('', setUsername, setPassword)

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
  const createBlogHandler = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blog))

      setSuccessNotification(`Added ${blog.title} by ${blog.author}`, 3)
    } catch (error) {
      const field = error.response.data.error.match(/`\w+`/)
      setErrorNotification(`Missing ${field}`, 3)
    }

    // reset values
    setHooksValue('', setTitle, setAuthor, setUrl)
  }

  // components
  const loginForm = () => (
    <div>
      <div>
        <h1>log in to application</h1>
      </div>
      <form onSubmit={loginHandler}>
        <div>
          username 
          <input 
            type='text'
            name='Username'
            value={username}
            onChange={usernameHandler}
          />
        </div>
        <div>
          password 
          <input 
            type='password'
            name='Password'
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={logoutHandler}>logout</button>  
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlogHandler}>
        <div>
          title: 
          <input 
            type='text'
            name='Title'
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          author: 
          <input 
            type='text'
            name='Author'
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          url: 
          <input 
            type='text'
            name='Url'
            value={url}
            onChange={urlHandler}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )

  const notifStyles = {
    border: `2px solid ${!errorMsg ? 'green' : 'red'}`,
    color: !errorMsg ? 'green' : 'red',
    width: '100%',
    fontSize: '16px',
  }

  const notification = () => (
    <div style={notifStyles}>
      <p style={{ padding: '3px 10px'}}>{successMsg || errorMsg}</p>
    </div>
  )

  return (
    <div>
      {(errorMsg || successMsg) && notification()}
      {
        user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App