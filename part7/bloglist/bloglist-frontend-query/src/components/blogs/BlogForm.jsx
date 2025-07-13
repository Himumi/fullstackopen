import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogServices from '../../services/blogs'
import useNotification from '../../hooks/useNotification'
import useInput from '../../hooks/useInput'

const BlogForm = ({ handleCreate }) => {
  const {reset: resetTitle, ...title} = useInput('text')
  const {reset: resetAuthor, ...author} = useInput('text')
  const {reset: resetUrl, ...url} = useInput('text')
  const { setSuccessNotification } = useNotification()
  const queryClient = useQueryClient()
  
  const handleSuccess =  blog => {
    setSuccessNotification(`Added ${blog.title} by ${blog.author}`, 3)
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.concat(blog))
  }

  const newBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: handleSuccess,
  })

  const resetValues = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  handleCreate ??= (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value
    })
    resetValues()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            data-testid="titleInput"
            name="Title"
            {...title}
          />
        </div>
        <div>
          author:
          <input
            data-testid="authorInput"
            name="Author"
            {...author}
          />
        </div>
        <div>
          url:
          <input
            data-testid="urlInput"
            name="Url"
            {...url}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
