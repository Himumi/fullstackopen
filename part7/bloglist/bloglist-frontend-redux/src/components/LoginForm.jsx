import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUserAndSave } from '../reducers/user'
import helper from '../helper/helper'

import useNotification from '../hooks/useNotification'
import useInput from '../hooks/useInput'

const LoginForm = ({ handleLogin }) => {
  const {reset: resetUsername, ...username} = useInput('text')
  const {reset: resetPassword, ...password} = useInput('password')
  const dispatch = useDispatch()
  const  { setSuccessNotification } = useNotification()

  const resetValues = () => {
    resetUsername()
    resetPassword()
  }

  handleLogin ??= (event) => {
    event.preventDefault()
    dispatch(setUserAndSave({
      username: username.value, 
      password: password.value
    })) 
    setSuccessNotification('Logged in', 3)
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
