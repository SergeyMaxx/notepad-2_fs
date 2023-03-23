import React, {useEffect} from 'react'
import notepad from '../../icons/notepad.png'
import {useHistory} from 'react-router-dom'
import {getDarkMode, openSettings} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'

const Main = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const darkMode = useSelector(getDarkMode())

  const handelCancel = e => {
    if (e.target.classList.contains('main')) {
      dispatch(openSettings({status: false}))
    }
  }

  useEffect(() => {
    darkMode === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [darkMode])

  return (
    <div className="main" onClick={handelCancel}>
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