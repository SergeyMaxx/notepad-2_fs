import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {favoritesOff, noteDelete, removeFavorites} from '../../Store/notes'
import trash from '../../../icons/Trash.svg'
import NoteField from '../form/noteField'

const NoteFavorites = ({note}) => {
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  const removeNote = () => {
    setModalActive(false)
    dispatch(noteDelete(note))
    dispatch((removeFavorites(note.id)))
  }

  return (
    <NoteField
      note={note}
      path={`/favorites/${note.id}`}
      handleFavorites={() => dispatch(favoritesOff({note, status: false}))}
      setModalActive={setModalActive}
      modalActive={modalActive}
      trashIcon={trash}
      deleteNote={removeNote}
      question='Are you sure you want to delete this note?'
      textBtn='Yes. Delete this note'
    />
  )
}

export default NoteFavorites