let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

const deleteToken = () => {
  token = null
}

export default {
  setToken,
  getToken,
  deleteToken
}