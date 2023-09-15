import React from 'react'
import Search from '../search'
import AddNote from '../addNote'
import Sort from '../sort'
import Note from '../notes/note'
import {useDispatch, useSelector} from 'react-redux'
import {getDarkMode, getNotes} from '../../Store/notes'
import SideBar from '../sideBar'
import Pagination from '../pagination'
import {handelCancel} from '../../utils/settingsOff'
import {handleSort} from '../../utils/sort'
import useSortPaginate from '../../hooks/useSortPaginate'
import Burger from '../burger'

const NoteList = () => {
  const notes = useSelector(getNotes())
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
    userCrop
  } = useSortPaginate(notes)

  return (
    <div className="note-list" onClick={e => handelCancel(e, dispatch)}>
      <SideBar/>
      <div className={'note-list__wrapper' + (darkMode === 'dark' ? ' note-list-dark' : '')}>
        <div className="note-list__container">
          <Burger/>
          <AddNote/>
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
          {userCrop.map(note => <Note key={note.id} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default NoteList