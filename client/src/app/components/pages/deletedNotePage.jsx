import React from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes} from '../../Store/notes'
import {useParams} from 'react-router-dom'
import NotePageField from '../form/notePageField'
import {getUserId} from '../../services/localStorage.service'
import useNotePage from '../../hooks/useNotePage'

const DeletedNotePage = () => {
  const notesBasket = useSelector(getBasketNotes())
  const {deletedNoteId} = useParams()

  const userNotes = notesBasket.filter(n => n.userId === getUserId())
  const note = useNotePage(userNotes, deletedNoteId)

  return (
    <NotePageField
      note={note}
      path="/trash"
      isNotTrashPage={false}
    />
  )
}

export default DeletedNotePage