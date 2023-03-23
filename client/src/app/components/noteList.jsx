import React, {useState} from 'react'
import Search from './search'
import AddNote from './addNote'
import Sort from './sort'
import Note from './notes/note'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {getNotes, openSettings} from '../Store/notes'
import SideBar from './sideBar'
import {getUserId} from '../services/localStorage.service'
import Pagination from './pagination'
import {paginate} from '../utils/paginate'

const NoteList = () => {
  const notes = useSelector(getNotes())
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})
  const dispatch = useDispatch()

  const userNotes = notes.filter(n => n.userId === getUserId())
  const pageSize = 15

  const notesSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(notesSearch, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedNotes, currentPage, pageSize)

  const handleSort = () => {
    setSortBy(prevState => ({
      ...prevState,
      order: prevState.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handelCancel = e => {
    if (e.target.classList.contains('note-list__wrapper') ||
      e.target.classList.contains('note-list__grid') ||
      e.target.classList.contains('note-list__container')) {
      dispatch(openSettings({status: false}))
    }
  }

  return (
    <div className="note-list" onClick={handelCancel}>
      <SideBar/>
      <div className="note-list__wrapper">
        <div className="note-list__container">
          <AddNote/>
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
          {userCrop.map(note => <Note key={note.id} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default NoteList