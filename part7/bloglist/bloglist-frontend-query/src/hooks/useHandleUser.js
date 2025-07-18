import { useContext, useEffect } from 'react'
import ReducerContext from '../reducers/ReducerContext'

import token from '../services/token'
import loginServices from '../services/login'

import useNotification from './useNotification'

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

const useHandleUser = () => {
  const { state, dispatch } = useContext(ReducerContext)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      token.setToken(user.token)
    }
  }, [])

  return {
    value: state.user
  }
}

export const useHandleLogin = () => {
  const { state, dispatch } = useContext(ReducerContext)

  return async (credential, onSuccess = null, onError = null ) => {
    try {
      const user = await loginServices.login(credential)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      token.setToken(user.token)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      if (onError) {
        onError()
      }
    }
  } 
}

export const useHandleLogout = () => {
  const { state, dispatch } = useContext(ReducerContext)
  
  return (onSuccess = null) => {
    // delete all user information from app
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogAppUser')
    token.deleteToken()

    if (onSuccess) {
      onSuccess()
    }
  }
}

export default useHandleUser