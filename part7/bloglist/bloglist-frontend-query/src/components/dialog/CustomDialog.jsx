import { Button, Dialog,IconButton, Typography } from "@material-tailwind/react"
import { Xmark } from 'iconoir-react'

const CustomDialog = (props) => {
  return (
    <Dialog className='w-1/4'>
      <Dialog.Trigger as={Button}>{props.buttonLabel}</Dialog.Trigger>
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4 mb-6">
            <Typography type="h6">
              {props.dialogLabel}
            </Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <Xmark className="h-5 w-5" />
            </Dialog.DismissTrigger>
          </div>
          <div className="px-10 pb-12">
            {props.children}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  )
}

export default CustomDialog