import React from 'react'
import {useParams} from 'react-router-dom'
import FavoritesList from '../components/favoritesList'
import FavoritesPage from '../components/pages/favoritesPage'
import NoteLayoutsField from '../components/form/noteLayoutsField'

const FavoritesNotes = () => {
  const {favoritesNoteId} = useParams()

  return (
    <NoteLayoutsField
      id={favoritesNoteId}
      page={<FavoritesPage/>}
      list={<FavoritesList/>}
    />
  )
}

export default FavoritesNotes