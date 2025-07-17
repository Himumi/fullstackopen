import { Typography } from "@material-tailwind/react"
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"

const Comments = ({ blog }) => {
  return (
    <div>
      <Typography
        className='text-base my-4 font-medium' 
      >
        Comments
      </Typography>
      <CommentForm />
      <CommentList comments={blog.comments} />
    </div>
  )
}

export default Comments