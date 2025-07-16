import CommentForm from "./CommentForm"
import CommentList from "./CommentList"

const Comments = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <CommentForm />
      <CommentList comments={blog.comments} />
    </div>
  )
}

export default Comments