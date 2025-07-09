const Anecdote = ({ anecdote, onClick }) => {
  const handleVote = onClick

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote