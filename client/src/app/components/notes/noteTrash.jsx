import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {noteReturn, noteReturnAll} from '../../Store/notes'
import restore from '../../../assets/Restore.svg'
import NoteField from '../form/noteField'

const NoteTrash = ({note}) => {
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  const restoreNote = () => {
    note.favoritesStatus
      ? dispatch(noteReturnAll(note))
      : dispatch(noteReturn(note))
    setModalActive(false)
  }

  return (
    <NoteField
      note={note}
      path={`/trash/${note.id}`}
      setModalActive={setModalActive}
      modalActive={modalActive}
      trashIcon={restore}
      deleteNote={restoreNote}
      question="Are you sure you want to restore the note?"
      textBtn="Yes. Restore this note"
    />
  )
}

export default NoteTrash