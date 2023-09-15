import React, {useState} from 'react'
import Modal from './modal/modal'
import plus from '../../assets/Plus.svg'

const AddNote = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <>
      <div className="note-list__container_add-note" onClick={() => setModalActive(true)}>
        <img
          className="note-list__container_add-note-plus"
          src={plus}
          alt="plus logo"/>
        <span className="note-list__container_add-note-new">
          New
        </span>
      </div>
      <Modal active={modalActive} setActive={setModalActive}/>
    </>
  )
}

export default AddNote