import { createContext, useReducer } from "react";
import rootReducer from './root'

const initialState = {
  notification: '',
} 

const ReducerContext = createContext()

export const ReducerProvider = ({ children}) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <ReducerContext.Provider value={{state, dispatch}}>
      {children}
    </ReducerContext.Provider>
  )
}

export default ReducerContext