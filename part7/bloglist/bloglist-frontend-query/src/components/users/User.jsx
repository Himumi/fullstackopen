import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Card, List, ListItem, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"

const User = () => {
  const queryClient = useQueryClient()
  const id = useParams().id

  const users = queryClient.getQueryData(['users'])
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div className="flex justify-center my-32">
      <Card variant='solid' className="w-1/3 px-6 py-12">
        <Typography type="h2" className='mx-10 mb-10'>
          {user.name}
        </Typography>
        <div className="w-full my-6 mx-6 ">
          <Typography className='font-medium text-lg pl-8 mb-4'>
            Added Blogs
          </Typography>
          <List className='mt-7'>
            {user.blogs.map(blog => 
              <ListItem 
                key={blog.id}
                className="px-8 py-4 my-1 mx-8"
              >
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </ListItem>
            )}
            {user.blogs.length === 0 && 
              <Typography className='px-8 my-4 mx-8'>
                no content
              </Typography>
            }
          </List>
        </div>
      </Card>
    </div>
  )
}

export default User