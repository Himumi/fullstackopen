import { useState } from 'react'

const useVisible = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return [
    visible,
    toggleVisibility
  ]
}

export default useVisible