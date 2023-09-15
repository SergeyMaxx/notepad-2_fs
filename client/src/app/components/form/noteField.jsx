import React from 'react'
import on from '../../../assets/Gold-star.svg'
import off from '../../../assets/Star.svg'
import ModalConfirmation from '../modal/modalConfirmation'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getDarkMode} from '../../Store/notes'

const NoteField = ({
                     note,
                     path,
                     handleFavorites,
                     setModalActive,
                     modalActive,
                     trashIcon,
                     deleteNote,
                     question,
                     textBtn
                   }) => {
  const darkMode = useSelector(getDarkMode())
  const history = useHistory()

  return (
    <>
      <div className={'note-list__grid_item' + (darkMode === 'dark' ? ' note-dark' : '')}>
        <h2 className="note-list__grid_item-header">
          {note.header}
        </h2>
        <div
          className="note-list__grid_item-body"
          onClick={() => history.push(path)}
        >
          <p className="note-list__grid_item-body-hidden">
            {note.newNote}
          </p>
          <div className="data-block">
            <span className="note-list__grid_item-date">{note.date}</span>
            <span className="note-list__grid_item-time">{note.time}</span>
          </div>
        </div>
        <div className="box">
          {note.favoritesStatus
            ? <img className="favorite-off" src={on} alt="off logo" onClick={handleFavorites}/>
            : <img className="favorite-off" src={off} alt="on logo" onClick={handleFavorites}/>
          }
          <img
            className="note-list__grid_item-trash"
            onClick={() => setModalActive(true)}
            src={trashIcon}
            alt="trash logo"
          />
        </div>
      </div>
      <ModalConfirmation
        active={modalActive}
        setActive={setModalActive}
        remove={deleteNote}
        confirmationText={question}
        buttonText={textBtn}
      />
    </>
  )
}

NoteField.propTypes = {
  note: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  handleFavorites: PropTypes.func,
  setModalActive: PropTypes.func.isRequired,
  modalActive: PropTypes.bool.isRequired,
  trashIcon: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired
}

export default NoteField