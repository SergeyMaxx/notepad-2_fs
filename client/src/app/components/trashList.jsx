import React, {useState} from 'react'
import {getBasketNotes, noteDeleteAll, openSettings} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import ModalConfirmation from './modal/modalConfirmation'
import Search from './search'
import NoteTrash from './notes/noteTrash'
import SideBar from './sideBar'
import {getUserId} from '../services/localStorage.service'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'

const TrashList = () => {
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalActive, setModalActive] = useState(false)
  const notesBasket = useSelector(getBasketNotes())
  const dispatch = useDispatch()

  const userNotes = notesBasket.filter(n => n.userId === getUserId())
  const pageSize = 15

  const basketSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const userCrop = paginate(basketSearch, currentPage, pageSize)

  const removeAll = () => {
    setModalActive(false)
    dispatch(noteDeleteAll())
  }

  const handelCancel = e => {
    if (e.target.classList.contains('note-list__wrapper') ||
      e.target.classList.contains('note-list__grid')) {
      dispatch(openSettings({status: false}))
    }
  }

  return (
    <div className="note-list basket-list" onClick={handelCancel}>
      <SideBar/>
      <div className="note-list__wrapper">
        <div className="note-list__container">
          <button
            className="note-list__container_add-note delete-all"
            onClick={() => setModalActive(true)}
          >
            Remove All
          </button>
          <ModalConfirmation
            active={modalActive}
            setActive={setModalActive}
            remove={removeAll}
            confirmationText="Are you sure you want to empty the trash?"
            buttonText="Yes. Clear"
          />
          <Pagination
            userNotes={userNotes}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Search setSearchText={setSearchText}/>
        </div>
        <div className="note-list__grid">
          {userCrop.map(note => <NoteTrash key={note.id} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default TrashList