import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import blogServices from '../services/blogs'

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogServices.getAll,
  })
}

export const useBlogQuery = (id) => {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogServices.getById(id)
  })
}

export const useBlogsMutation = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: (result, variable, context) => {
      // Update ['blogs'] query
      queryClient.setQueryData(
        ['blogs'], 
        (oldBlogs) => [...oldBlogs, result]
      )
    }
  })

  const updateMutation = useMutation({
    mutationFn: blogServices.update,
    onSuccess: (result, variable, context) => {
      // Update ['blogs', id] query
      queryClient.setQueryData(['blogs', result.id],
        (oldBlog) => result
      )
    }
  })

  const updateLikesMutation = useMutation({
    mutationFn: blogServices.updateLikes,
    onSuccess: (result, variable, context) => {
      // Update ['blogs', id] query
      queryClient.setQueryData(['blogs', result.id],
        (oldBlog) => result
      )
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogServices.remove,
    onSuccess: (result, variable, context) => {
      // Remove ['blogs', id] query
      queryClient.removeQueries({ queryKey: ['blogs', variable.id] })
    }
  })

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
    updateLikes: updateLikesMutation,
  }
}