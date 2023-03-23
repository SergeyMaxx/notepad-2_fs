import React from 'react'
import {useParams} from 'react-router-dom'
import TrashList from '../components/trashList'
import DeletedNotePage from '../components/pages/deletedNotePage'
import NoteLayoutsField from '../components/form/noteLayoutsField'

const DeletedNotes = () => {
  const {deletedNoteId} = useParams()

  return (
    <NoteLayoutsField
      id={deletedNoteId}
      page={<DeletedNotePage/>}
      list={<TrashList/>}
    />
  )
}

export default DeletedNotes