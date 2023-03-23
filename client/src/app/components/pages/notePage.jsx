import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {change, changeFavorites, getFavoritesNotes, getNotes} from '../../Store/notes'
import {useParams} from 'react-router-dom'
import NotePageField from '../form/notePageField'
import {getUserId} from '../../services/localStorage.service'
import useNotePage from '../../hooks/useNotePage'

const NotePage = () => {
  const notes = useSelector(getNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const {noteId} = useParams()
  const dispatch = useDispatch()

  const userNotes = notes.filter(n => n.userId === getUserId())
  const note = useNotePage(userNotes, noteId)

  const editNote = (userInput, userInputHeader) => {
    if (notesFavorites.some(n => n.id === note.id)) {
      dispatch(changeFavorites({
        id: noteId,
        newNote: userInput,
        header: userInputHeader
      }))
    } else {
      dispatch(change({
        id: noteId,
        newNote: userInput,
        header: userInputHeader
      }))
    }
  }

  return (
    <NotePageField
      note={note}
      path="/notes"
      modalActive={modalActive}
      setModalActive={setModalActive}
      changeNote={editNote}
      isNotTrashPage={true}
    />
  )
}

export default NotePage