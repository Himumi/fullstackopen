import axios from 'axios'
const baseUrl = '/api/blogs'

import token from './token'

const config = () => {
  return {
    headers: { Authorization: token.getToken() }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config())
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config())
  return response.data
}

const updateLikes = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}/likes`, blog, config())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response.data
}

export default { 
  getAll, 
  getById, 
  create, 
  update, 
  remove, 
  updateLikes,
}
