import CustomDialog from "../dialog/CustomDialog"
import BlogForm from "./BlogForm"

const CreateBlogDialog = () => {
  return (
    <CustomDialog dialogLabel='Create Blog' buttonLabel='create blog'>
      <BlogForm />
    </CustomDialog>
  )
}

export default CreateBlogDialog