import React, {useEffect, useState} from 'react'
import Search from './search'
import AddNote from './addNote'
import Sort from './sort'
import Note from './notes/note'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {getNotes} from '../Store/notes'
import SideBar from './sideBar'
import {getUserId} from '../services/localStorage.service'
import Pagination from './pagination'
import {paginate} from '../utils/paginate'
import {handelCancel} from '../utils/settingsOff'
import {handleSort} from '../utils/sort'

const NoteList = () => {
  const notes = useSelector(getNotes())
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})
  const dispatch = useDispatch()

  const userNotes = notes.filter(n => n.userId === getUserId())
  const pageSize = 15
  const pageCount = Math.ceil(userNotes.length / pageSize)

  const notesSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(notesSearch, [sortBy.iter], [sortBy.order])
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