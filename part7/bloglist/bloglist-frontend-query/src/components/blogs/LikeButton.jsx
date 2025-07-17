import { useBlogsMutation } from "../../hooks/useBlogsQuery"
import useNotification from "../../hooks/useNotification"
import { Button } from "@material-tailwind/react"

const LikeButton = ({ blog }) => {
  const blogsMutation = useBlogsMutation()
  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const handleUpdate = () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogsMutation.updateLikes.mutate(updateBlog, {
      onSuccess: (result, variable, context) => {
        setSuccessNotification(`Liked ${variable.title}`, 3)
      },
      onError: (error, variable, context) => {
        console.log(error)
        setErrorNotification(`Failed updating ${variable.title}`, 3)
      }
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUpdate}
      className="ml-1"
    >
      like
    </Button>
  )
}

export default LikeButton