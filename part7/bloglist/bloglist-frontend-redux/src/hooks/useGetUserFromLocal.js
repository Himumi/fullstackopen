import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set } from '../reducers/user'
import blogServices from '../services/blogs'

const useGetUserFromLocal = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(set(user))
      blogServices.setToken(user.token)
    }
  }, [])
}

export default useGetUserFromLocal