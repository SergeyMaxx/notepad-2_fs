import React from 'react'
import {useHistory} from 'react-router-dom'
import DarkMode from './darkMode'
import LogOut from './logOut'
import EditUser from './editUser'
import folder from '../../assets/burger-folder.svg'
import on from '../../assets/berger-star.svg'
import trash from '../../assets/burger-trash.svg'
import burgerMoon from '../../assets/burger-moon.svg'
import logout from '../../assets/burger-logout.svg'
import settings from '../../assets/burger-settings.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getBurgerOpen, getDarkMode, openBurger} from '../Store/notes'

const Burger = () => {
  const burgerStatus = useSelector(getBurgerOpen())
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()
  const history = useHistory()

  const handleBurger = path => {
    dispatch(openBurger({status: !burgerStatus}))
    history.push(path)
  }

  return (
    <div className={burgerStatus ? 'menu-icon open' : 'menu-icon'}>
      <div
        className="menu-bar"
        onClick={() => dispatch(openBurger({status: !burgerStatus}))}
      >
        <div className={'bar1 ' + (darkMode === 'dark' ? 'bar-dark' : '')}/>
        <div className={'bar2 ' + (darkMode === 'dark' ? 'bar-dark' : '')}/>
        <div className={'bar3 ' + (darkMode === 'dark' ? 'bar-dark' : '')}/>
      </div>
      <div className="navigation">
        <div>
          <button className="link" onClick={() => handleBurger('/notes')}>
            <img className="folder" src={folder} alt="folder logo"/>
            All notes
          </button>
          <button className="link" onClick={() => handleBurger('/favorites')}>
            <img className="folder on" src={on} alt="star logo"/>
            Favorites
          </button>
          <button className="link" onClick={() => handleBurger('/trash')}>
            <img className="folder trash" src={trash} alt="trash logo"/>
            Trash
          </button>
          <DarkMode addClass="link" hide="hidden">
            <img className="folder on" src={burgerMoon} alt="moon logo"/>
          </DarkMode>
          <EditUser addClass="link">
            <img className="folder on" src={settings} alt="settings logo"/>
          </EditUser>
        </div>
        <LogOut addClass="link">
          <img className="folder on" src={logout} alt="logout logo"/>
        </LogOut>
      </div>
    </div>
  )
}

export default Burger