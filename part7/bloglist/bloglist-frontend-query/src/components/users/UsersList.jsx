import { useQueryClient } from "@tanstack/react-query"

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList