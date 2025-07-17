import { Link } from "react-router-dom"
import ButtonLogin from "./ButtonLogin"
import UserLoggedIn from "./UserLoggedIn"
import useHandleUser from "../../hooks/useHandleUser"

const Nav = () => {
  const user = useHandleUser()

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
      {user.value && <UserLoggedIn />}
      {!user.value && <ButtonLogin />}
    </div>
  )
}

export default Nav