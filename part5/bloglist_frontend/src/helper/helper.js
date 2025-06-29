const inputOnChangeHandler = (func) =>
  ({ target }) => func.call(null, target.value)

const setHooksValue = (...funcs) => value => 
  funcs.forEach(func => func.call(null, value))

export default {
  inputOnChangeHandler,
  setHooksValue
}