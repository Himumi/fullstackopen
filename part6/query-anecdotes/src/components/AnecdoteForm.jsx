import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdotes"
import { useNotificationDispatch, handleNotification } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const appendNewAnecdote = newAnecdote => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    queryClient.setQueryData(
      ['anecdotes'],
      anecdotes.concat(newAnecdote)
    )
  }

  const dispatch = useNotificationDispatch()
  const setNotification = handleNotification(dispatch)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: appendNewAnecdote,
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // Post anecdote to server
    newAnecdoteMutation.mutate({ content, votes: 0 })

    setNotification(`Created ${content}`, 5)
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
