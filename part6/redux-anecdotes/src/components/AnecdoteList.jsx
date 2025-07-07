import { useSelector, useDispatch } from "react-redux"
import { toggleVote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdoteSorter = (a, b) => b.votes - a.votes
  const anecdotesSelector = ({ anecdotes, filter }) => {
    // Sort anecdotes based on their votes
    const sortedAnecdotes = anecdotes.sort(anecdoteSorter) 
    
    if (filter === '') {
      return sortedAnecdotes
    }

    return sortedAnecdotes.filter(
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