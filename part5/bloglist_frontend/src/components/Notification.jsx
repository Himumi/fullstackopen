const Notification = ({ errorMsg, successMsg }) => {
  if (!errorMsg && !successMsg) {
    return null
  }

  const notifStyles = {
    border: `2px solid ${!errorMsg ? 'green' : 'red'}`,
    color: !errorMsg ? 'green' : 'red',
    width: '100%',
    fontSize: '16px',
  }

  return (
    <div style={notifStyles} className="notification">
      <p style={{ padding: '3px 10px' }}>{successMsg || errorMsg}</p>
    </div>
  )
}

export default Notification
