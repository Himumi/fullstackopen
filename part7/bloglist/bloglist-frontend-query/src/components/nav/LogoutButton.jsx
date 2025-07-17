import { useHandleLogout } from "../../hooks/useHandleUser"

const LogoutButton = () => {
  const handleLogout = useHandleLogout()

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton
