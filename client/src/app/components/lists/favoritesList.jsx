import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDarkMode, getFavoritesNotes} from '../../Store/notes'
import Sort from '../sort'
import Search from '../search'
import NoteFavorites from '../notes/noteFavorites'
import SideBar from '../sideBar'
import Pagination from '../pagination'
import {handelCancel} from '../../utils/settingsOff'
import {handleSort} from '../../utils/sort'
import useSortPaginate from '../../hooks/useSortPaginate'
import Burger from '../burger'

const FavoritesList = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()
  const {
    setSortBy,
    userNotes,
    pageSize,
    pageCount,
    currentPage,
    setCurrentPage,
    setSearchText,
    userCrop} = useSortPaginate(notesFavorites)

  return (
    <div className="note-list" onClick={e => handelCancel(e, dispatch)}>
      <SideBar/>
      <div className={'note-list__wrapper' + (darkMode === 'dark' ? ' note-list-dark' : '')}>
        <div className="note-list__container">
          <Burger/>
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