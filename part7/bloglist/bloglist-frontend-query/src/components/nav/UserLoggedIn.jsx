import useHandleUser from "../../hooks/useHandleUser"
import LogoutButton from "./LogoutButton"

const UserLoggedIn = () => {
  const user = useHandleUser()

  if (!user.value) {
    return null
  }

  return (
    <div>
      <div>
        <span>{user.value.name} logged in</span>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default UserLoggedIn