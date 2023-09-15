import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDarkMode, getSettingsOpen, openSettings} from '../Store/notes'
import settings from '../../assets/Settings.svg'
import whiteSettings from '../../assets/white-settings.svg'
import DarkMode from './darkMode'
import LogOut from './logOut'
import EditUser from './editUser'

const Settings = () => {
  const settingsStatus = useSelector(getSettingsOpen())
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()

  return (
    <>
      <button
        className="nav-settings"
        onClick={() => dispatch(openSettings({status: !settingsStatus}))}>
        {darkMode === 'dark'
          ? <img className="nav-settings-logo" src={whiteSettings} alt="settings logo"/>
          : <img className="nav-settings-logo" src={settings} alt="settings logo"/>
        }

      </button>
      <div className={'nav-settings-body' + (settingsStatus ? ' op' : '')}>
        <EditUser addClass="nav-settings-body__item"/>
        <LogOut addClass="nav-settings-body__item"/>
        <DarkMode addClass="nav-settings-body__item"/>
      </div>
    </>
  )
}

export default Settings