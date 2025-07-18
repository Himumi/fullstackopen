import { useNavigate } from "react-router-dom"
import { useField } from '../hooks/hooks'

const CreateNew = (props) => {
  const {reset: resetContent, ...content} = useField('text')
  const {reset: resetAuthor, ...author} = useField('text')
  const {reset: resetInfo, ...info} = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    // Navigate to root
    navigate('/')
    props.handleNotification(`a new anecdote ${content}`, 5)
  }

  const setInputs = (value, ...fn) => {
    return () => {
      fn.forEach(reset => reset(value))
    }
  }
  const handleReset = setInputs('', resetContent, resetAuthor, resetInfo)

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <div>
          <button type='submit'>create</button>
          <button type='button' onClick={handleReset}>reset</button>
        </div>
      </form>
    </div>
  )

}

export default CreateNew