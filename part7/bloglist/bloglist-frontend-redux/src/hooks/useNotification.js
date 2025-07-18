import { useDispatch } from "react-redux";
import { setNotification } from '../reducers/notification'

const useNotification = () => {
  const dispatch = useDispatch()
  const setSuccessNotification = (message, second) => {
    dispatch(setNotification('success', message, second))
  }  

  const setErrorNotification = (message, second) => {
    dispatch(setNotification('error', message, second))
  }

  return {
    setSuccessNotification,
    setErrorNotification
  }
}

export default useNotification