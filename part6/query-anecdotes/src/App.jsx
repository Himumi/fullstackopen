import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import { useNotificationDispatch, handleNotification } from './components/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryclient = useQueryClient()

  const dispatch = useNotificationDispatch()
  const setNotification = handleNotification(dispatch)

  const appendUpdateAnecdote = updateAnecdote => {
    const anecdotes = queryclient.getQueryData(['anecdotes'])
    const updatedAnecdotes = anecdotes.map(
      a => a.id !== updateAnecdote.id ? a : updateAnecdote
    )
    queryclient.setQueryData(['anecdotes'], updatedAnecdotes)
    // Display success message
    setNotification(`You voted ${updateAnecdote.content}`, 5)
  }

  const handleError = error => {
    setNotification(error.response.data.error, 5)
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: appendUpdateAnecdote,
    onError: handleError
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ 
      ...anecdote,
      votes: anecdote.votes + 1 
    })
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
