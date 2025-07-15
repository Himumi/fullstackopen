import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogServices from '../../services/blogs'
import useNotification from '../../hooks/useNotification'
import useInput from '../../hooks/useInput'
import useToggleVisible from '../../hooks/useToggleVisible'
import { useBlogsMutation } from '../../hooks/useBlogsQuery'

const BlogForm = () => {
  const {reset: resetTitle, ...title} = useInput('text')
  const {reset: resetAuthor, ...author} = useInput('text')
  const {reset: resetUrl, ...url} = useInput('text')

  const {toggleVisibility} = useToggleVisible()
  const blogsMutation = useBlogsMutation()
  const queryClient = useQueryClient()

  const { 
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  const resetValues = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const handleCreate = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogsMutation.create.mutate(newBlog, {
      onSuccess: (result, variable, context) => {
        setSuccessNotification(`Added ${result.title} by ${result.author}`, 3)
      },
      onError: (error, variable, context) => {
        console.log(error)
        setErrorNotification(`Failed creating blog`, 3)       
      }
    })

    toggleVisibility()
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
