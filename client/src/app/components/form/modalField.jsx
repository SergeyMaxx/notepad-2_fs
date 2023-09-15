import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'

const ModalField = ({
                      userInput,
                      setUserInput,
                      userInputHeader,
                      setUserInputHeader,
                      active,
                      setActive,
                      handleSubmit,
                      buttonText
                    }) => {
  const characterLimit = 800
  const headerCharacterLimit = 60

  const handleChange = ({target}) => {
    if (characterLimit - target.value.length >= 0) {
      setUserInput(target.value)
    }
  }

  const handleChangeHeader = ({target}) => {
    if (headerCharacterLimit - target.value.length >= 0) {
      setUserInputHeader(target.value)
    }
  }

  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'content content-active' : 'content'}
        onClick={e => e.stopPropagation()}
      >
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={userInputHeader}
            onChange={handleChangeHeader}
            placeholder="Enter header..."
            className="content-header"
          />
          <small className="remaining-header">
            {userInputHeader.length} / {headerCharacterLimit}
          </small>
          <textarea
            value={userInput}
            onChange={handleChange}
            placeholder="Enter new note..."
            className="content-body"
          />
          <small className="remaining-body">
            {userInput.length} / {characterLimit}
          </small>
          <Button buttonText={buttonText} handleClick={() => setActive(false)}/>
        </form>
      </div>
    </div>
  )
}

ModalField.propTypes = {
  userInput: PropTypes.string.isRequired,
  setUserInput: PropTypes.func.isRequired,
  userInputHeader: PropTypes.string.isRequired,
  setUserInputHeader: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default ModalField