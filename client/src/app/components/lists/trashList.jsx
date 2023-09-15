import React, {useEffect, useState} from 'react'
import {getBasketNotes, getDarkMode, noteDeleteAll} from '../../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import ModalConfirmation from '../modal/modalConfirmation'
import Search from '../search'
import NoteTrash from '../notes/noteTrash'
import SideBar from '../sideBar'
import {getUserId} from '../../services/localStorage.service'
import {paginate} from '../../utils/paginate'
import Pagination from '../pagination'
import {handelCancel} from '../../utils/settingsOff'
import Burger from '../burger'

const TrashList = () => {
  const notesBasket = useSelector(getBasketNotes())
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalActive, setModalActive] = useState(false)
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()

  const userNotes = notesBasket.filter(n => n.userId === getUserId())
  const pageSize = 15
  const pageCount = Math.ceil(userNotes.length / pageSize)

  const basketSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const userCrop = paginate(basketSearch, currentPage, pageSize)

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount)
    }
  }, [userNotes.length, currentPage, pageCount])

  const removeAll = () => {
    setModalActive(false)
    dispatch(noteDeleteAll())
  }

  return (
    <div className="note-list basket-list" onClick={e => handelCancel(e, dispatch)}>
      <SideBar/>
      <div className="note-list__wrapper basket-list-shadow">
        <div className="note-list__container">
          <Burger/>
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
          {userCrop.map(note => <NoteTrash key={note.id} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default TrashList