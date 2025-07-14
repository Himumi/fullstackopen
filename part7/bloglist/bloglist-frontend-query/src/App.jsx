import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
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
      <Nav />
      <Home />
    </div>
  )
}

export default App
