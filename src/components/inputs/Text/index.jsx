import React from 'react'

const Input = ({ err, ...rest }) => {
  return (
    <div>
      <input type="text" />
      <span style={'color: red'}>{err}</span>
    </div>
  )
}

export default Input