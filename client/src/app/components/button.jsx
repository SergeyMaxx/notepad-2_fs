import React from 'react'
import PropTypes from 'prop-types'

const Button = ({buttonText, handleClick, addClass}) => {
  return (
    <button
      className={`modal-button ${addClass}`}
      onClick={handleClick}
      type="submit"
    >
      {buttonText}
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  addClass: PropTypes.string
}

export default Button