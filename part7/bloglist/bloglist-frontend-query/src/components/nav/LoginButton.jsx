import { Button, Typography } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"

const LoginButton = () => {
  return (
    <Button size='md'>
      <NavLink to='/login' end>
        <Typography>
          Log in
        </Typography>
      </NavLink>
    </Button>
  )
}

export default LoginButton