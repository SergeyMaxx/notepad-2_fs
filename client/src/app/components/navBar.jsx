import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Settings from './settings'
import NavProfile from './navProfile'
import {getDarkMode, openSettings} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLoggedIn} from '../Store/auth'

const NavBar = () => {
  const history = useHistory()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const dispatch = useDispatch()
  const darkMode = useSelector(getDarkMode())

  const handelCancel = e => {
    if (e.target.classList.contains('nav') ||
      e.target.classList.contains('nav-row')) {
      dispatch(openSettings({status: false}))
    }
  }

  return (
    <nav
      className={'nav' + (darkMode === 'dark' ? ' nav-dark' : '')}
      onClick={handelCancel}
    >
      <div className="nav-row">
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