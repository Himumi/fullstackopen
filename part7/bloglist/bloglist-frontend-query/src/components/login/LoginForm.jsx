import { useNavigate } from 'react-router-dom'
import { useHandleLogin } from '../../hooks/useHandleUser'
import useInput from '../../hooks/useInput'
import useNotification from '../../hooks/useNotification'

const LoginForm = ({ handleLogin }) => {
  const {reset: resetUsername, ...username} = useInput('text')
  const {reset: resetPassword, ...password} = useInput('password')
  const handleUserLogin = useHandleLogin()
  const navigate = useNavigate()

  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const resetValues = () => {
    resetUsername()
    resetPassword()
  }

  handleLogin ??= (event) => {
    event.preventDefault()

    handleUserLogin(
      {
        username: username.value,
        password: password.value
      }, 
      () => {
        setSuccessNotification('success log in', 3)
        navigate('/')
      },
      () => {
        setErrorNotification('Fail log in', 3)
      }
    )
    
    resetValues()
  }

  return (
    <div>
      <div>
        <h1>log in to application</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            className="username"
            name="Username"
            {...username}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            className="password"
            name="Password"
            {...password}
          />
        </div>
        <div>
          <button type="submit" className="loginButton">
            login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
