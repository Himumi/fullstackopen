const Anecdote = ({ anecdote }) => {
  const margin = {
    margin: '20px 0',
  }

  const padding = {
    padding: '0 10px'
  }

  return (
    <div style={margin}>
      <h2>Anecdote</h2>
      <div style={padding}>
        <strong><em>{anecdote.content} by {anecdote.author}</em></strong>
        <br />
        <span>
          {anecdote.votes}
          <button>vote</button>
        </span>
      </div>
    </div>
  )
}

export default Anecdote