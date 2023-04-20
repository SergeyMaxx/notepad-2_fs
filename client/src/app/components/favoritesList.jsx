import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFavoritesNotes} from '../Store/notes'
import _ from 'lodash'
import Sort from './sort'
import Search from './search'
import NoteFavorites from './notes/noteFavorites'
import SideBar from './sideBar'
import {getUserId} from '../services/localStorage.service'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'
import {handelCancel} from '../utils/settingsOff'
import {handleSort} from '../utils/sort'

const FavoritesList = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})
  const dispatch = useDispatch()

  const userNotes = notesFavorites.filter(n => n.userId === getUserId())
  const pageSize = 15
  const pageCount = Math.ceil(userNotes.length / pageSize)

  const favoritesSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(favoritesSearch, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedNotes, currentPage, pageSize)

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount)
    }
  }, [userNotes.length, currentPage, pageCount])

  return (
    <div className="note-list" onClick={e => handelCancel(e, dispatch)}>
      <SideBar/>
      <div className="note-list__wrapper">
        <div className="note-list__container">
          <Sort sort={() => handleSort(setSortBy)}/>
          {userNotes.length > pageSize &&
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
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