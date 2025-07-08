import { useDispatch } from 'react-redux'
import anecdotesService from '../services/anecdotes'

import { newAnecdote } from '../reducers/anecdoteReducer.js'
import { setMessage, removeMessage } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async event => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const anecdote = await anecdotesService.createNew(content)
    dispatch(newAnecdote(anecdote))    
    
    // Set notification message
    dispatch(setMessage(`Created ${anecdote.content}`))
    setTimeout(() => dispatch(removeMessage()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm