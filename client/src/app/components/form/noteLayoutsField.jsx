import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../loader'
import {
  getBasketNotes,
  getFavoritesNotes,
  getLoading,
  getNotes,
  loadNotes,
  loadNotesFavorites,
  loadNotesTrash
} from '../../Store/notes'

const NoteLayoutsField = ({id, page, list}) => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const dispatch = useDispatch()
  const loading = useSelector(getLoading())

  useEffect(() => {
    if (loading) {
      dispatch(loadNotes())
    }
  }, [notes])

  useEffect(() => {
    if (loading) {
      dispatch(loadNotesTrash())
    }
  }, [notesBasket])

  useEffect(() => {
    if (loading) {
      dispatch(loadNotesFavorites())
    }
  }, [notesFavorites])

  if (loading) return <Loader/>

  return id ? page : list
}

export default NoteLayoutsField