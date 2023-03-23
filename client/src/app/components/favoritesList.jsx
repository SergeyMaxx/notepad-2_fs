import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFavoritesNotes, openSettings} from '../Store/notes'
import _ from 'lodash'
import Sort from './sort'
import Search from './search'
import NoteFavorites from './notes/noteFavorites'
import SideBar from './sideBar'
import {getUserId} from '../services/localStorage.service'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'

const FavoritesList = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})
  const dispatch = useDispatch()

  const userNotes = notesFavorites.filter(n => n.userId === getUserId())
  const pageSize = 15

  const favoritesSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(favoritesSearch, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedNotes, currentPage, pageSize)

  const handleSort = () => {
    setSortBy(prevState => ({
      ...prevState,
      order: prevState.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handelCancel = e => {
    if (e.target.classList.contains('note-list__wrapper') ||
      e.target.classList.contains('note-list__grid')) {
      dispatch(openSettings({status: false}))
    }
  }

  return (
    <div className="note-list" onClick={handelCancel}>
      <SideBar/>
      <div className="note-list__wrapper">
        <div className="note-list__container">
          <Sort sort={handleSort}/>
          <Pagination
            userNotes={userNotes}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Search setSearchText={setSearchText}/>
        </div>
        <div className="note-list__grid">
          {userCrop.map(note => <NoteFavorites key={note.id} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default FavoritesList