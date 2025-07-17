import { useNavigate } from "react-router-dom"
import { useHandleLogout } from "../../hooks/useHandleUser"
import useNotification from "../../hooks/useNotification"

const LogoutButton = () => {
  const { setSuccessNotification } = useNotification()
  const navigate = useNavigate()
  const handleUserLogout = useHandleLogout()

  const handleLogout = () => {
    handleUserLogout(
      () => {
        navigate('/')
        setSuccessNotification('Success logout', 3)
      }
    )
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton
