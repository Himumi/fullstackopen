import { useNavigate } from 'react-router-dom'
import { useHandleLogin } from '../../hooks/useHandleUser'
import useInput from '../../hooks/useInput'
import useNotification from '../../hooks/useNotification'
import { Button, Card, Input, Typography } from '@material-tailwind/react'

const LoginForm = ({ handleLogin }) => {
  const {reset: resetUsername, ...username} = useInput('text')
  const {reset: resetPassword, ...password} = useInput('password')
  const handleUserLogin = useHandleLogin()
  const navigate = useNavigate()

  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const resetValues = () => {
    resetUsername()
    resetPassword()
  }

  handleLogin ??= (event) => {
    event.preventDefault()

    handleUserLogin(
      {
        username: username.value,
        password: password.value
      }, 
      () => {
        setSuccessNotification('success log in', 3)
        navigate('/')
      },
      () => {
        setErrorNotification('Fail log in', 3)
      }
    )
    
    resetValues()
  }

  return (
    <div className='flex justify-center'>
      <Card className='bg-slate-50  w-1/3 m-12 py-40 px-36 '>
        <Typography type='h4' >
          Log In
        </Typography>
        <Typography className='mt-2 font-light -white'>
          Please Input Username and Password
        </Typography>
        <form onSubmit={handleLogin} className='mt-8 w-80 max-w-screen-lg '>
          <div className='mb-1 flex flex-col gap-6'>
            <Typography type='h6' className='-mb-3'>
              Username
            </Typography>
            <Input 
              size='lg'
              placeholder='username'
              className='!border-t-blue-gray-200 focus:!border-t-gray-900'
              {...username}
            />
            <Typography type='h6' className='-mb-3'>
              Password
            </Typography>
            <Input 
              size='lg'
              placeholder='password'
              className='!border-t-blue-gray-200 focus:!border-t-gray-900'
              {...password}
            />
            <Button 
              type='primary' 
              onClick={handleLogin}
              className='mt-3'
            >
              login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default LoginForm
