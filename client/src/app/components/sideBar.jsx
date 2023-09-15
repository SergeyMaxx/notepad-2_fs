import React from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes, getDarkMode, getFavoritesNotes, getNotes} from '../Store/notes'
import {useHistory} from 'react-router-dom'
import {getUserId} from '../services/localStorage.service'
import folder from '../../assets/Folder.svg'
import burgerFolder from '../../assets/white-folder.svg'
import star from '../../assets/Gold-star.svg'
import whiteStar from '../../assets/white-star.svg'
import trash from '../../assets/Trash.svg'
import whiteTrash from '../../assets/white-trash.svg'

const SideBar = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const darkMode = useSelector(getDarkMode())
  const history = useHistory()

  return (
    <div className={'side-bar' + (darkMode === 'dark' ? ' side-bar-dark' : '')}>
      <div className="side-bar__list">
        <div
          className={'side-bar__list_all' + (darkMode === 'dark' ? ' all-dark' : '')}
          onClick={() => history.push('/notes')}
        >
          {darkMode === 'dark'
            ? <img className="side-bar__list_all-logo" src={burgerFolder} alt="folder logo"/>
            : <img className="side-bar__list_all-logo" src={folder} alt="folder logo"/>
          }
          <p className={'side-bar__list_all-text' + (darkMode === 'dark' ? ' darkness' : '')}>
            All notes :
          </p>
          <p className={'side-bar__list_all-num' + (darkMode === 'dark' ? ' darkness' : '')}>
            {notes.filter(n => n.userId === getUserId()).length}
          </p>
        </div>
        <div
          className={'side-bar__list_favorites' + (darkMode === 'dark' ? ' favorites-dark' : '')}
          onClick={() => history.push('/favorites')}
        >
          {darkMode === 'dark'
            ? <img className="side-bar__list_favorites-logo" src={whiteStar} alt="folder logo" />
            : <img className="side-bar__list_favorites-logo" src={star} alt="folder logo" />
          }
          <p className={'side-bar__list_favorites-text' + (darkMode === 'dark' ? ' darkness' : '')}>
            Favorites :
          </p>
          <p className={'side-bar__list_favorites-num' + (darkMode === 'dark' ? ' darkness' : '')}>
            {notesFavorites.filter(n => n.userId === getUserId()).length}
          </p>
        </div>
        <div
          className={'side-bar__list_trash' + (darkMode === 'dark' ? ' trash-dark' : '')}
          onClick={() => history.push('/trash')}
        >
          {darkMode === 'dark'
            ? <img className="side-bar__list_trash-bin" src={whiteTrash} alt="trash logo"/>
            : <img className="side-bar__list_trash-bin" src={trash} alt="trash logo"/>
          }
          <p className={'side-bar__list_trash-text' + (darkMode === 'dark' ? ' darkness' : '')}>
            Trash :
          </p>
          <p className={'side-bar__list_trash-num' + (darkMode === 'dark' ? ' darkness' : '')}>
            {notesBasket.filter(n => n.userId === getUserId()).length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SideBar