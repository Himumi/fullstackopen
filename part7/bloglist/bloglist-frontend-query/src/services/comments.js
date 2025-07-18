import axios from "axios";
import token from './token'

const baseUrl = (id) => `/api/blogs/${id}/comments` 

const config = () => {
  return {
    headers: { Authorization: token.getToken() }
  }
}

const create = async (object) => {
  const id = object.id 
  const newObject = { content: object.content }

  const response = await axios.post(baseUrl(id), newObject, config())
  return response.data
}

export default {
  create
}