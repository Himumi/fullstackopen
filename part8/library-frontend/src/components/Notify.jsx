const Notify = ({ message }) => {
  if (!message) {
    return;
  }

  const styles = {
    border: '1px solid green',
    padding: '2px',
  };

  return <div style={styles}>{message}</div>;
};

export default Notify;
