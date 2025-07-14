import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import Nav from './components/Nav'
import User from './components/users/User'
import Users from './components/users/Users'
import UsersList from './components/users/UsersList'

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
        <Route index element={<Home />} />
        <Route path='users' element={<Users />} >
          <Route index element={<UsersList />} />
          <Route path=':id' element={<User />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
