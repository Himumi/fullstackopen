import usersServices from '../services/users'
import { useQuery } from '@tanstack/react-query'

const useQueryUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersServices.getAll
  })

  return result
}

export default useQueryUsers