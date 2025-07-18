import useNotification from "../../hooks/useNotification"
import { useBlogsMutation } from "../../hooks/useBlogsQuery"

import { Button } from "@material-tailwind/react"

const DeleteButton = ({ blog }) => {
  const blogsMutation = useBlogsMutation()
  const { 
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (confirm) {
      blogsMutation.delete.mutate(blog, {
        onSuccess: (result, variable, context) => {
          setSuccessNotification(`removed ${variable.title}`, 3)
        },
        onError: (error, variable, context) => {
          console.log(error)
          setErrorNotification(`Failed deleting ${variable.title}`, 3)
        }
      })
    }
  } 

  return <Button onClick={handleDelete}>delete blog</Button>
}

export default DeleteButton