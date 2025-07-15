const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.length === 0 
          ? 
            <li>no comment</li> 
          : 
            comments.map(comment => 
              <li key={comment.id}>{comment.content}</li>
            )
        }
      </ul>
    </div>
  )
}

export default CommentList