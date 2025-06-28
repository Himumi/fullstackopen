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

  const loginHandler = async (event) => {
    event.preventDefault()
    console.log('logging in')

    try {
      const user = await loginService.login({
        username, password
      }) 

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      console.log('succeeded to login')
    } catch (error) {
      console.log('failed to login')
    }
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.deleteToken()
  }

  const usernameHandler = (event) =>
    setUsername(event.target.value)
  const passwordHandler = (event) =>
    setPassword(event.target.value)

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

  const titleHandler = ({ target }) => setTitle(target.value)
  const authorHandler = ({ target }) => setAuthor(target.value)
  const urlHandler = ({ target }) => setUrl(target.value)

  const createBlogHandler = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blog))
    } catch (error) {
      console.log(error)
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

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

  return (
    <div>

      {
        user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App