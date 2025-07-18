import useNotification from '../../hooks/useNotification'
import useInput from '../../hooks/useInput'
import useToggleVisible from '../../hooks/useToggleVisible'
import { useBlogsMutation } from '../../hooks/useBlogsQuery'
import { Button, Card, Input, Typography } from '@material-tailwind/react'

const BlogForm = () => {
  const {reset: resetTitle, ...title} = useInput('text')
  const {reset: resetAuthor, ...author} = useInput('text')
  const {reset: resetUrl, ...url} = useInput('text')

  const {toggleVisibility} = useToggleVisible()
  const blogsMutation = useBlogsMutation()

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
      <Card className='w-full p-10'>
        <form onSubmit={handleCreate}>
          <div className='mb-2'>
            <Typography type='small' className='font-medium italic pl-2'>
              Title
            </Typography>
            <Input 
              name='Title'
              data-testid='titleInput'
              {...title}
              size='sm'
              placeholder='blog title'
            /> 
          </div>
          <div className='mb-2'>
            <Typography type='small' className='font-medium italic pl-2'>
              Author
            </Typography>
            <Input 
              name='Author'
              data-testid='authorInput'
              {...author}
              size='sm'
              placeholder='blog author'
            /> 
          </div>
          <div className='mb-2'>
            <Typography type='small' className='font-medium italic pl-2'>
              Url
            </Typography>
            <Input 
              name='Url'
              data-testid='urlInput'
              {...url}
              size='sm'
              placeholder='blog url'
            /> 
          </div>
          <div className='mt-6'>
            <Button type='submit' variant='outline'>create</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default BlogForm
