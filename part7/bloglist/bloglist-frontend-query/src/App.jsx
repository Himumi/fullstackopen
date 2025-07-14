import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import Nav from './components/Nav'

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import useUser from './hooks/useUser'
import Users from './components/Users'

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
        <Route path='users' element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
