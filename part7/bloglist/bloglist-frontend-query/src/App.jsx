import LoginForm from './components/login/LoginForm'
import Notification from './components/notification/Notification'
import Nav from './components/nav/Nav'
import User from './components/users/User'
import Users from './components/users/Users'
import UsersList from './components/users/UsersList'
import BlogsList from './components/blogs/BlogsList'
import Blog from './components/blogs/Blog'

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import useHandleUser from './hooks/useHandleUser'

import './App.css'

const App = () => {
  // Get user from localStorage
  useHandleUser() 

  return (
    <Router>
      <Notification />
      <Nav />

      <Routes>
        <Route index element={<BlogsList />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='users' element={<Users />} >
          <Route index element={<UsersList />} />
          <Route path=':id' element={<User />} />
        </Route>
        <Route path='blogs' >
          <Route index element={<BlogsList />} />
          <Route path=':id' element={<Blog />} />
        </Route>
      </Routes>

    </Router>
  )
}

export default App
