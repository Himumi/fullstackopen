import { List, ListItem, Typography } from "@material-tailwind/react"

const CommentList = ({ comments }) => {
  return (
      <List className='my-2'>
        {comments.length === 0 
          && <ListItem>no comment</ListItem> 
        }
        {comments.length !== 0
          && comments.map(comment => 
            <ListItem key={comment.id}>
              {comment.content}
            </ListItem>
          )}
      </List>
  )
}

export default CommentList