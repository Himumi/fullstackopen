import usersServices from '../services/users'
import { useQuery } from '@tanstack/react-query'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersServices.getAll
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>failed to retrieve users data</div>
  }

  const users = result.data

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

export default Users