import { useNavigate } from "react-router-dom"
import { useHandleLogout } from "../../hooks/useHandleUser"
import useNotification from "../../hooks/useNotification"

import { Button, Typography } from "@material-tailwind/react"

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
    <Button size="md" onClick={handleLogout}>
      <Typography>
        Log out
      </Typography>
    </Button>
  )
}

export default LogoutButton
