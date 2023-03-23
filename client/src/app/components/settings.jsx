import React, {useEffect, useState} from 'react'
import EditUserPage from './pages/editUserPage'
import ModalConfirmation from './modal/modalConfirmation'
import {useDispatch, useSelector} from 'react-redux'
import {darkModeToggle, getDarkMode, getSettingsOpen, openSettings} from '../Store/notes'
import settingsIcon from '../../icons/Settings.svg'
import sun from '../../icons/sun.svg'
import moon from '../../icons/moon.svg'
import {logOut} from '../Store/auth'

const Settings = () => {
  const [modalActive, setModalActive] = useState(false)
  const [modalLogout, setModalLogout] = useState(false)
  const [state, setState] = useState(localStorage.getItem('darkMode') === 'dark')
  const settingsStatus = useSelector(getSettingsOpen())
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()

  const darkModeToggler = () => {
    !state
      ? localStorage.setItem('darkMode', 'dark')
      : localStorage.setItem('darkMode', 'light')

    dispatch(darkModeToggle({status: localStorage.getItem('darkMode')}))
    setState(prevState => !prevState)
  }

  useEffect(() => {
    darkMode === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [darkMode])

  useEffect(() => {
    if (!modalActive) {
      dispatch(openSettings({status: false}))
    }
  }, [modalActive])

  return (
    <>
      <button
        className="nav-settings"
        onClick={() => dispatch(openSettings({status: !settingsStatus}))}>
        <img className="nav-settings-logo" src={settingsIcon} alt="settings logo"/>
      </button>
      <div className={'nav-settings-body' + (settingsStatus ? ' op' : '')}>
        <div className="nav-settings-body__item" onClick={() => setModalActive(true)}>
          Settings
        </div>
        <EditUserPage active={modalActive} setActive={setModalActive}/>
        <div className="nav-settings-body__item" onClick={() => setModalLogout(true)}>
          Log out
        </div>
        <span className="nav-settings-body__item" onClick={darkModeToggler}>
          Dark mode
        </span>
        <button
          className={'dark-mode-btn' + (state ? ' dark-mode-btn__active' : '')}
          onClick={darkModeToggler}
        >
          <img className="dark-mode-btn__sun" src={sun} alt="sun"/>
          <img className="dark-mode-btn__moon" src={moon} alt="moon"/>
        </button>
      </div>
      <ModalConfirmation
        active={modalLogout}
        setActive={setModalLogout}
        remove={() => dispatch(logOut())}
        confirmationText="Do you really want out?"
        buttonText="Yes. I want to go out"
      />
    </>
  )
}

export default Settings