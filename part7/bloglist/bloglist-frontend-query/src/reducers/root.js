import notificationReducer from "./notification";
import userReducer from './user'

const rootReducer = (state, action) => {
  return {
    notification: notificationReducer(state.notification, action),
    user: userReducer(state.user, action)
  }
}

export default rootReducer