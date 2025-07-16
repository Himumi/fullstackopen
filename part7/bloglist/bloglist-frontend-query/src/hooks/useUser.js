import { useContext, useEffect } from 'react'
import ReducerContext from '../reducers/ReducerContext'

import token from '../services/token'
import loginServices from '../services/login'

import useNotification from './useNotification'

const useUser = () => {
  const { state, dispatch } = useContext(ReducerContext)
  const { 
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user
    }
  }

  const removeUser = () => {
    return {
      type: 'REMOVE_USER'
    }
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      token.setToken(user.token)
    }
  }, [])

  const handleLogin = async credential => {
    try {
      const user = await loginServices.login(credential)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      token.setToken(user.token)
      setSuccessNotification(`Logged in ${user.name}`, 3) 
    } catch (error) {
      setErrorNotification(`Failed login`, 3)
    }
  } 

  const handleLogout = () => {
    // delete all user information from app
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogAppUser')
    token.deleteToken()

    setSuccessNotification('Logged out', 3)
  }

  return {
    value: state.user,
    handleLogin,
    handleLogout
  }
}

export default useUser