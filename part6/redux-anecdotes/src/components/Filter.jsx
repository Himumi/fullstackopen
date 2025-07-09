import { useDispatch } from "react-redux"
import { filterAnecdote } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleFilter = (event) => 
    dispatch(filterAnecdote(event.target.value)) 

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <label htmlFor="filterInput">filter</label>
      <input
        id="filterInput"
        onChange={handleFilter}
      />
    </div>
  )
}

export default Filter