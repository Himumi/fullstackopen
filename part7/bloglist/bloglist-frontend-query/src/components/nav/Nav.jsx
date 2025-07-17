import { NavLink } from "react-router-dom"
import UserLoggedIn from "./UserLoggedIn"
import useHandleUser from "../../hooks/useHandleUser"
import { Navbar, Typography } from "@material-tailwind/react"

import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

const navLink = [
  {
    label: 'Blogs',
    path: '/blogs',
  },
  {
    label: 'Users',
    path: '/users'
  }
]


const Nav = () => {
  const user = useHandleUser()

  return (
    <div>
    <Navbar className="mx-auto w-full max-w-screen-xl">
      <div className="flex items-center">
        <div className="ml-2 mr-2 block py-1 ">
          <NavLink to='/' end>
            <Typography type="small" className="font-semibold">
              App
            </Typography>
          </NavLink>
        </div>
        <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
        {navLink.map(link => 
          <div key={link.label} className='ml-3 mr-3 py-1 '>
            <NavLink to={link.path} end>
              <Typography type="small" className='font-medium'>
                {link.label}
              </Typography>
            </NavLink>
          </div>
        )}
        <div className="ml-3 mr-3 block py-1 ">
          <Typography type="small" className='font-semibold italic underline' >
            {user.value && <UserLoggedIn />}
          </Typography>
        </div>
        <div className="ml-auto mr-2 inline-block">
          {user.value
            ? <LogoutButton />            
            : <LoginButton />
          }
        </div>
      </div>
      </Navbar>
    </div>
  )
}

export default Nav