import { useSelector } from "react-redux"

const Notification = () => {
  const { message, status} = useSelector(state => state.notification)

  if (message === '') {
    return null
  }

  const isSuccess = status === 'success'

  const notifStyles = {
    border: `2px solid ${isSuccess ? 'green' : 'red'}`,
    color: isSuccess ? 'green' : 'red',
    width: '100%',
    fontSize: '16px'
  }

  return (
    <div style={notifStyles} className="notification">
      <p style={{ padding: '3px 10px' }}>{message}</p>
    </div>
  )
}

export default Notification
