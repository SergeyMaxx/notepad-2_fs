import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Settings from './settings'
import NavProfile from './navProfile'
import {getDarkMode} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLoggedIn} from '../Store/auth'
import {handelCancel} from '../utils/settingsOff'

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <nav
      className={'nav' + (darkMode === 'dark' ? ' nav-dark' : '')}
      onClick={e => handelCancel(e, dispatch)}
    >
      <div className={'nav-row' + (darkMode === 'dark' ? ' nav-row-dark' : '')}>
        <ul className="nav-list">
          {isLoggedIn
            ? <NavProfile/>
            : <>
              <li
                className={'nav-list__item' + (darkMode === 'dark' ? ' darkness-item' : '')}
                onClick={() => history.push('/signIn')}
              >
                <Link
                  className={'nav-list__link' + (darkMode === 'dark' ? ' darkness-link' : '')}
                  to="/signIn"
                >
                  Sign in
                </Link>
              </li>
              <li
                className={'nav-list__item' + (darkMode === 'dark' ? ' darkness-item' : '')}
                onClick={() => history.push('/signUp')}
              >
                <Link
                  className={'nav-list__link' + (darkMode === 'dark' ? ' darkness-link' : '')}
                  to="/signUp"
                >
                  Sign up
                </Link>
              </li>
            </>}
        </ul>
        <h1 className="nav-header">Notepad</h1>
        {isLoggedIn && <Settings/>}
      </div>
    </nav>
  )
}

export default NavBar