import { createContext, useContext, useReducer } from "react"

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload
    case 'REMOVE_MESSAGE':
      return ''
    default:
      state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const setMessage = message => new Object({
  type: 'SET_MESSAGE',
  payload: message
})

const removeMessage = () => new Object({
  type: 'REMOVE_MESSAGE'
})

export const handleNotification = dispatch => (message, second) => {
  dispatch(setMessage(message))
  setTimeout(() => dispatch(removeMessage()), second * 1000)
}

export default NotificationContext