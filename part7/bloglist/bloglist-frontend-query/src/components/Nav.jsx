import useUser from "../hooks/useUser"

const Nav = () => {
  const user = useUser()

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <span>{user.value.name} logged in</span>
        <button onClick={user.handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Nav