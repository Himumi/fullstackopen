import useToggleVisible from '../../hooks/useToggleVisible'

// eslint-disable-next-line react/display-name
const Togglable = (props, ref) => {
  const {visible, toggleVisibility} = useToggleVisible()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.textLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
