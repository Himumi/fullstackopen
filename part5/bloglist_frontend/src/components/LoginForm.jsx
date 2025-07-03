import { useState } from 'react'
import helper from '../helper/helper'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameChangeHandler = helper.inputOnChangeHandler(setUsername)
  const passwordChangeHandler = helper.inputOnChangeHandler(setPassword)
  const setHooks = helper.setHooksValue(
    setUsername, setPassword
  )

  const loginHandler = (event) => {
    event.preventDefault()
    handleLogin({
      username, password
    })

    setHooks('')
  }

  return (
    <div>
      <div>
        <h1>log in to application</h1>
      </div>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            data-testid='username'
            className='username'
            type='text'
            name='Username'
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            className='password'
            type='password'
            name='Password'
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div>
          <button type='submit' className='loginButton'>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
