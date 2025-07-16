import { useParams } from "react-router-dom"
import useInput from "../../hooks/useInput"
import { useCreateCommentsMutation } from "../../hooks/useCommentsMutation"

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
      <form style={{display: 'flex'}} onSubmit={handleCreate}>
        <div>
          <input 
            name='commentInput'
            {...comment}
          />
        </div>
        <div>
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm