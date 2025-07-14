import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"

const Nav = () => {
  const user = useUser()

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    height: 50,
    paddingLeft: 15,
    background: 'lightgray',
  }

  return (
    <div style={navStyles}>
      <div>
        <Link to='/blogs'>blogs</Link>
      </div>
      <div>
        <Link to='/users'>users</Link>
      </div>
      <div>
        <span>{user.value.name} logged in</span>
      </div>
      <div>
        <button onClick={user.handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Nav