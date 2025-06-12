import './notification.css';

const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  }

  const classes = `notification ${className}`;
  return (
    <div className={classes}>
      {message}
    </div>
  );
};

export default Notification;