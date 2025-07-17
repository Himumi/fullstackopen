import { useParams } from "react-router-dom"
import useInput from "../../hooks/useInput"
import { useCreateCommentsMutation } from "../../hooks/useCommentsMutation"
import { Input, Button } from "@material-tailwind/react"

const CommentForm = () => {
  const {reset: resetComment, ...comment} = useInput('text')
  const id = useParams().id

  const createCommentMutation = useCreateCommentsMutation()

  const handleCreate = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment.value,
      id
    }

    createCommentMutation.mutate(newComment, {
      onSuccess: (result, variable, context) => {
        console.log('created comment')
      },
      onError: (error, variable, context) => {
        console.error(error)
      } 
    })

    resetComment()
  }

  return (
    <div>
      <form 
        onSubmit={handleCreate}
        className="flex items-center gap-2 w-full"
      >
        <div className="w-3/4">
          <Input 
            name='commentInput'
            {...comment}
            size='sm'
            placeholder="add comment"
            className=""
          />
        </div>
        <div className="w-1/4">
          <Button variant="outline" size="sm" type="submit">add comment</Button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm