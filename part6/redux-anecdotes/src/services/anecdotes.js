import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll, getById, createNew, update }