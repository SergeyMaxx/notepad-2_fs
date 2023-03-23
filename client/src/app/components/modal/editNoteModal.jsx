import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import ModalField from '../form/modalField'

const EditNoteModal = ({active, setActive, editNote, valueHeader, valueNote}) => {
  const [userInput, setUserInput] = useState(valueNote)
  const [userInputHeader, setUserInputHeader] = useState(valueHeader)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(editNote(userInput, userInputHeader))
  }

  return (
    <ModalField
      userInput={userInput}
      setUserInput={setUserInput}
      userInputHeader={userInputHeader}
      setUserInputHeader={setUserInputHeader}
      active={active}
      setActive={setActive}
      handleSubmit={handleSubmit}
      buttonText="Save"
    />
  )
}

EditNoteModal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  valueHeader: PropTypes.string.isRequired,
  valueNote: PropTypes.string.isRequired
}

export default EditNoteModal