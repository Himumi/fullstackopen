import { useContext } from "react";
import ReducerContext from '../reducers/ReducerContext'

const useToggleVisible = () => {
  const {state, dispatch} = useContext(ReducerContext)
  const toggleVisible = () => {
    return {
      type: 'TOGGLE_VISIBLE'
    }
  }

  const toggleVisibility = () => {
    dispatch(toggleVisible())
  }

  return {
    visible: state.toggleVisible,
    toggleVisibility
  }
}

export default useToggleVisible