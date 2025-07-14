import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const UserList = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map(user => 
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} >{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList