import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {createNote} from '../../Store/notes'
import {getUserId} from '../../services/localStorage.service'
import ModalField from '../form/modalField'

const Modal = ({active, setActive}) => {
  const [userInput, setUserInput] = useState('')
  const [userInputHeader, setUserInputHeader] = useState('')
  const dispatch = useDispatch()

  const addNote = (userInput, userInputHeader) => {
    if (userInput.trim() || userInputHeader.trim()) {
      dispatch(createNote({
        id: Math.random().toString(36).slice(2),
        header: userInputHeader,
        newNote: userInput,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        favoritesStatus: false,
        userId: getUserId()
      }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    addNote(userInput, userInputHeader)
    setUserInput('')
    setUserInputHeader('')
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
      buttonText="Add"
    />
  )
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}

export default Modal