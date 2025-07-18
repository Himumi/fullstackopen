import useHandleUser from "../../hooks/useHandleUser"

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
    </div>
  )
}

export default UserLoggedIn