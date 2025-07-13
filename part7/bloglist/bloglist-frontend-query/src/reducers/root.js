import notificationReducer from "./notification";

const rootReducer = (state, action) => {
  return {
    notification: notificationReducer(state.notification, action)
  }
}

export default rootReducer