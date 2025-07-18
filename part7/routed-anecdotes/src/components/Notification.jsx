const Notification = ({ message }) => {
  if (message === '') {
    return
  }

  const styles = {
    border: '1px solid black',
    margin: '10px 0',
    padding: 5
  }

  return (
    <div style={styles}>{message}</div>
  )
}

export default Notification