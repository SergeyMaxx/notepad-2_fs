import React from 'react'
import back from '../../../icons/Back arrow.svg'
import edit from '../../../icons/Edit.svg'
import EditNoteModal from '../modal/editNoteModal'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

const NotePageField = ({
                         note,
                         path,
                         modalActive,
                         setModalActive,
                         changeNote,
                         isNotTrashPage
                       }) => {
  const history = useHistory()

  const handleBack = () => {
    localStorage.removeItem('current-notes')
    history.push(path)
  }

  return (
    <div className="page">
      <div className="note-page">
        <h2 className="note-page__header">
          {note.header}
        </h2>
        <p className="note-page__body">
          {note.newNote}
        </p>
        <div className="note-page__container">
          <img
            className="note-page__container_arrow"
            onClick={handleBack}
            src={back}
            alt="back arrow logo"
          />
          {isNotTrashPage &&
            <img
              className="note-page__container_edit"
              onClick={() => setModalActive(true)}
              src={edit}
              alt="edit logo"
            />}
        </div>
        {isNotTrashPage &&
          <EditNoteModal
            active={modalActive}
            setActive={setModalActive}
            valueHeader={note.header}
            valueNote={note.newNote}
            editNote={changeNote}
          />}
      </div>
    </div>
  )
}

NotePageField.propTypes = {
  note: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  modalActive: PropTypes.bool,
  setModalActive: PropTypes.func,
  changeNote: PropTypes.func,
  isNotTrashPage: PropTypes.bool.isRequired
}

export default NotePageField