import { useSelector, useDispatch } from "react-redux"
import { toggleVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  // Fetch Anecdotes from redux
  const anecdoteSorter = (a, b) => b.votes - a.votes
  const anecdotes = useSelector(state => state.sort(anecdoteSorter))

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