import { Outlet } from "react-router-dom"
import useQueryUsers from "../../hooks/useQueryUsers"

const Users = () => {
  const result = useQueryUsers()

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>failed to retrieve users data</div>
  }

  return (
    <Outlet />
  )
}

export default Users