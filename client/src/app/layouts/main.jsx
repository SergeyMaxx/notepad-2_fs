import React, {useEffect} from 'react'
import notepad from '../../assets/notepad.png'
import {useHistory} from 'react-router-dom'
import {getDarkMode} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import {handelCancel} from '../utils/settingsOff'

const Main = () => {
  const darkMode = useSelector(getDarkMode())
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    darkMode === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [darkMode])

  return (
    <div className="main" onClick={e => handelCancel(e, dispatch)}>
      <img
        className="main-img"
        onClick={() => history.push('/notes')}
        src={notepad}
        alt="notepad-logo"
      />
    </div>
  )
}

export default Main