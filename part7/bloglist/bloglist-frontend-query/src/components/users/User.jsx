import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const User = () => {
  const queryClient = useQueryClient()
  const id = useParams().id

  const users = queryClient.getQueryData(['users'])
  const user = users.find(user => user.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <span><strong>added blogs</strong></span>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User