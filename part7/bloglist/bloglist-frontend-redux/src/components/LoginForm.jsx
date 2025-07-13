import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUserAndSave } from '../reducers/user'
import helper from '../helper/helper'
import useNotification from '../hooks/useNotification'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const  { setSuccessNotification } = useNotification()

  const usernameChangeHandler = helper.inputOnChangeHandler(setUsername)
  const passwordChangeHandler = helper.inputOnChangeHandler(setPassword)
  const setHooks = helper.setHooksValue(setUsername, setPassword)

  handleLogin ??= (event) => {
    event.preventDefault()
    dispatch(setUserAndSave({
      username, password
    })) 
    setSuccessNotification('Logged in', 3)
    setHooks('')
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
            type="text"
            name="Username"
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            className="password"
            type="password"
            name="Password"
            value={password}
            onChange={passwordChangeHandler}
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
