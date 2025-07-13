import useNotification from '../hooks/useNotification'

const Notification = () => {
  const { notification } = useNotification()

  if (notification.status === '') {
    return null
  }

  const isSuccess = notification.status === 'success'

  const notifStyles = {
    border: `2px solid ${isSuccess ? 'green' : 'red'}`,
    color: isSuccess ? 'green' : 'red',
    width: '100%',
    fontSize: '16px'
  }

  return (
    <div style={notifStyles} className="notification">
      <p style={{ padding: '3px 10px' }}>{notification.message}</p>
    </div>
  )
}

export default Notification
