import { useQuery } from "@tanstack/react-query"
import blogServices from '../services/blogs'

const useQueryBlogs = () => {
  const result =  useQuery({
    queryKey: ['blogs'],
    queryFn: blogServices.getAll 
  })

  return result
}

export default useQueryBlogs