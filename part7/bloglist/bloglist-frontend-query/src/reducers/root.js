import notificationReducer from "./notification";
import userReducer from './user'
import visibleReducer from './visible'

const rootReducer = (state, action) => {
  return {
    notification: notificationReducer(state.notification, action),
    user: userReducer(state.user, action),
    toggleVisible: visibleReducer(state.toggleVisible, action)
  }
}

export default rootReducer