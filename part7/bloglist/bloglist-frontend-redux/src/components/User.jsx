import { useDispatch, useSelector } from "react-redux"
import { deleteAllUserInfo } from "../reducers/user"
import useNotification from "../hooks/useNotification"

const User = ({ handleLogout }) => {
  const user = useSelector(state => state.user)
  const { setSuccessNotification } = useNotification()
  const dispatch = useDispatch()

  handleLogout ??= () => {
    dispatch(deleteAllUserInfo())
    setSuccessNotification('Logged out', 3)
  }

  return (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default User