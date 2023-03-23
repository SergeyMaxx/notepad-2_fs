import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeFavorites, getFavoritesNotes} from '../../Store/notes'
import {useParams} from 'react-router-dom'
import NotePageField from '../form/notePageField'
import {getUserId} from '../../services/localStorage.service'
import useNotePage from '../../hooks/useNotePage'

const FavoritesPage = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const {favoritesNoteId} = useParams()
  const dispatch = useDispatch()

  const userNotes = notesFavorites.filter(n => n.userId === getUserId())
  const note = useNotePage(userNotes, favoritesNoteId)

  const editNote = (userInput, userInputHeader) => {
    dispatch(changeFavorites({
      id: favoritesNoteId,
      newNote: userInput,
      header: userInputHeader
    }))
  }

  return (
    <NotePageField
      note={note}
      path="/favorites"
      modalActive={modalActive}
      setModalActive={setModalActive}
      changeNote={editNote}
      isNotTrashPage={true}
    />
  )
}

export default FavoritesPage