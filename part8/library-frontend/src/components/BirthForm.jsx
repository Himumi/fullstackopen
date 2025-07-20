import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH } from "../queries/authors"

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBirth] = useMutation(EDIT_AUTHOR_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS  } ]
  })

  const handleUpdate = (event) => {
    event.preventDefault()

    changeBirth({
      variables: { name, setBornTo: Number(born) }
    })

    setName('')
    setBorn('')
  }
  
  const setValue = f => ({ target }) => f.call(null, target.value)

  const handleName = setValue(setName)
  const handleBorn = setValue(setBorn)

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={handleUpdate}>
        <div>
          name
          <input 
            value={name}
            onChange={handleName}
          />
        </div>
        <div>
          born
          <input 
            value={born}
            onChange={handleBorn}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthForm