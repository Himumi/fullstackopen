import { useSelector, useDispatch } from "react-redux"
import { toggleVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotesSelector = ({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }

    return anecdotes.filter(
      a => a.content.toLowerCase().includes(filter)
    )
  }

  // Fetch Anecdotes from redux
  const anecdotes = useSelector(anecdotesSelector)

  const handleVote = (id) => () => dispatch(toggleVote(id))

  return (
    <div>
      {anecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          onClick={handleVote}
        />
      )}
    </div>
  )
}

export default AnecdoteList