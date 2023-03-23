import React from 'react'
import PropTypes from 'prop-types'

const PasswordField = ({data, handleChange, _class}) => {
  return (
    <input
      name="password"
      type="password"
      value={data.password}
      required
      onChange={handleChange}
      placeholder="Password"
      className={'login-form__input password ' + _class}
    />
  )
}

PasswordField.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  _class: PropTypes.string
}

export default PasswordField