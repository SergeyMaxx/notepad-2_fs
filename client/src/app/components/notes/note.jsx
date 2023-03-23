import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addFavorites, noteDelete, removeFavorites} from '../../Store/notes'
import trash from '../../../icons/Trash.svg'
import NoteField from '../form/noteField'

const Note = ({note}) => {
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  const removeNote = () => {
    setModalActive(false)
    dispatch(noteDelete(note))
    dispatch((removeFavorites(note.id)))
  }

  const favoritesToggle = () => {
    note.favoritesStatus
      ? dispatch(addFavorites({note, status: false}))
      : dispatch(addFavorites({note, status: true}))
  }

  return (
    <NoteField
      note={note}
      path={`/notes/${note.id}`}
      handleFavorites={favoritesToggle}
      setModalActive={setModalActive}
      modalActive={modalActive}
      trashIcon={trash}
      deleteNote={removeNote}
      question="Are you sure you want to delete this note?"
      textBtn="Yes. Delete this note"
    />
  )
}

export default Note