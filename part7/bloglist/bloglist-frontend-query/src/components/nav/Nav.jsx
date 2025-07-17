import { NavLink } from "react-router-dom"
import UserLoggedIn from "./UserLoggedIn"
import useHandleUser from "../../hooks/useHandleUser"


const Nav = () => {
  const user = useHandleUser()

  return (
    <div className="flex items-center gap-6 h-12 pl-5 bg-slate-500">
      <NavLink to='/blogs' end>
        Blogs
      </NavLink>
      <NavLink to='/users' end>
        Users
      </NavLink>
      {user.value && <UserLoggedIn />}
      {!user.value && <NavLink to='/login' end>login</NavLink>}
    </div>
  )
}

export default Nav