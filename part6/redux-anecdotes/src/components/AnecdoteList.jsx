import { useSelector, useDispatch } from "react-redux"

import { increaseVotesOf } from "../reducers/anecdoteReducer"
import { setMessage, removeMessage } from '../reducers/notificationReducer'

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
  
  // Sort anecdotes based on their votes
  const anecdoteSorter = (a, b) => b.votes - a.votes
  const sortedAnecdotes = [...anecdotes].sort(anecdoteSorter)

  const handleVote = (id) => () => {
    dispatch(increaseVotesOf(id))

    // Set notification message
    const anecdote = sortedAnecdotes.find(a => a.id === id)
    dispatch(setMessage(`you voted ${anecdote.content}`))
    setTimeout(() => dispatch(removeMessage()), 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote => 
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