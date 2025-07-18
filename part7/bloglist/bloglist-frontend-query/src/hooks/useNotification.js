import { useContext } from 'react'
import ReducerContext from '../reducers/ReducerContext.jsx'

const useNotification = () => {
  const { state, dispatch } = useContext(ReducerContext)

  const setMessage = (status, message) => {
    return {
      type: 'SET_MESSAGE',
      payload: {
        status,
        message
      }
    }
  }

  const removeMessage = () => {
    return {
      type: 'REMOVE_MESSAGE'
    }
  }

  const setNotification = (status) => {
    return (message, second) => {
      dispatch(setMessage(status, message))
      setTimeout(() => {
        dispatch(removeMessage())
      }, second * 1000)
    }
  }

  const setSuccessNotification = setNotification('success')
  const setErrorNotification = setNotification('error')

  return {
    notification: state.notification,
    setNotification,
    setSuccessNotification,
    setErrorNotification
  }
}

export default useNotification