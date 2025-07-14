import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/blogs/Blogs'
import BlogForm from './components/blogs/BlogForm'
import Togglable from './components/Togglable'
import Nav from './components/Nav'

import useUser from './hooks/useUser'

const App = () => {
  const user = useUser() 

  if (!user.value) {
    return <LoginForm />
  }

  return (
    <div>
      <Notification />
      <div>
      <Nav />
        <Togglable textLabel="new blog" >
          <BlogForm />
        </Togglable>
        <Blogs />
      </div>
    </div>
  )
}

export default App
