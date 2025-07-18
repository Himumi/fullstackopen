import { Alert } from '@material-tailwind/react'
import useNotification from '../../hooks/useNotification'

const Notification = () => {
  const { notification } = useNotification()

  if (notification.status === '') {
    return null
  }

  const isSuccess = notification.status === 'success'

  return (
    <Alert variant='outline' color={notification.status} className='notification w-1/4 p-3 bg-white absolute right-5 bottom-5'>
      <Alert.Content className='font-semibold text-lg'>
        {notification.message}
      </Alert.Content>
    </Alert>
  )
}

export default Notification
