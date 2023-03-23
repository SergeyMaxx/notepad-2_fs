import React from 'react'
import PropTypes from 'prop-types'

const ModalConfirmation = ({active, setActive, remove, confirmationText, buttonText}) => {
  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'confirm confirm-active' : 'confirm'}
        onClick={e => e.stopPropagation()}
      >
        <div className="confirm__question">
          {confirmationText}
        </div>
        <button className="confirm__delete" onClick={remove}>
          {buttonText}
        </button>
        <button className="confirm__cancel" onClick={() => setActive(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

ModalConfirmation.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  remove: PropTypes.func,
  confirmationText: PropTypes.string,
  buttonText: PropTypes.string
}

export default ModalConfirmation