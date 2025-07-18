import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async event => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    dispatch(createAnecdote(content))    
    
    // Set notification message
    dispatch(setNotification(`Created ${content}`, 5))
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