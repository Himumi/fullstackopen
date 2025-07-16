import { useMutation, useQueryClient } from "@tanstack/react-query"
import commentsServices from '../services/comments'

export const useCreateCommentsMutation = () => {
  const queryClient = useQueryClient() 
  return useMutation({
    mutationFn: commentsServices.create,
    onSuccess: (result, variable, context) => {
      queryClient.setQueryData(['blogs', variable.id],
        (old) => new Object({
          ...old,
          comments: old.comments.concat(result)
        })
      )
    } 
  })
}
