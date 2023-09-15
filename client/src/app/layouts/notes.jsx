import React from 'react'
import {useParams} from 'react-router-dom'
import NoteList from '../components/lists/noteList'
import NotePage from '../components/pages/notePage'
import NoteLayoutsField from '../components/form/noteLayoutsField'

const Notes = () => {
  const {noteId} = useParams()

  return (
    <NoteLayoutsField
      id={noteId}
      page={<NotePage/>}
      list={<NoteList/>}
    />
  )
}

export default Notes