import useUser from '../hooks/useUser'
import useInput from '../hooks/useInput'

const LoginForm = ({ handleLogin }) => {
  const {reset: resetUsername, ...username} = useInput('text')
  const {reset: resetPassword, ...password} = useInput('password')
  const user = useUser()

  const resetValues = () => {
    resetUsername()
    resetPassword()
  }

  handleLogin ??= (event) => {
    event.preventDefault()

    user.handleLogin({
      username: username.value,
      password: password.value
    })

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
