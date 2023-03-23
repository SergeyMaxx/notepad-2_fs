import React from 'react'
import PropTypes from 'prop-types'

const EmailField = ({data, handleChange, _class}) => {
  return (
    <input
      name="email"
      type="email"
      value={data.email}
      required
      onChange={handleChange}
      placeholder="Email Address"
      className={'login-form__input ' + _class}
    />
  )
}

EmailField.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  _class: PropTypes.string
}

export default EmailField