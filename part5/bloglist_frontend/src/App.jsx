import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    console.log('logging in')

    try {
      const user = await loginService.login({
        username, password
      }) 

      setUser(user)
      setUsername('')
      setPassword('')
      console.log('succeeded to login')
    } catch (error) {
      console.log('failed to login')
    }
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
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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