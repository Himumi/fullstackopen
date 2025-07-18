import { Typography } from "@material-tailwind/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const UserList = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  return (
    <div className="w-3/4 mx-auto my-36">
      <table className="w-full">
        <thead className="border border-surface bg-surface-light text-lg font-medium text-foreground ">
          <tr className="h-16">
            <th className="border-r">users</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id} className="border-b border-surface h-16">
              <td className="p3 text-center border-l">
                <Link to={`/users/${user.id}`} >
                  <Typography className='font-normal'>
                    {user.name}
                  </Typography>
                </Link>
              </td>
              <td className="p3 text-center border-l border-r">
                <Typography className='font-normal'>
                  {user.blogs.length}
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList