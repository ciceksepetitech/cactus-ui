import React from 'react'

const ForwardedRefInput = ({ type, onKeyDown, placeholder, className }, ref) => {
  return (
    <input ref={ref} type={type} onKeyDown={onKeyDown} placeholder={placeholder} className={className} />
  )
}

const forwardedInput = React.forwardRef(ForwardedRefInput)

export default forwardedInput