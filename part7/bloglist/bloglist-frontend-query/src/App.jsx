import LoginForm from './components/login/LoginForm'
import Notification from './components/notification/Notification'
import Nav from './components/nav/Nav'
import User from './components/users/User'
import Users from './components/users/Users'
import UsersList from './components/users/UsersList'
import Blogs from './components/blogs/Blogs'
import Blog from './components/blogs/Blog'

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import useUser from './hooks/useUser'

const App = () => {
  const user = useUser() 

  if (!user.value) {
    return <LoginForm />
  }

  return (
    <Router>
      <Notification />
      <Nav />

      <Routes>
        <Route index element={<Blogs />} />
        <Route path='users' element={<Users />} >
          <Route index element={<UsersList />} />
          <Route path=':id' element={<User />} />
        </Route>
        <Route path='blogs' >
          <Route index element={<Blogs />} />
          <Route path=':id' element={<Blog />} />
        </Route>
      </Routes>

    </Router>
  )
}

export default App
