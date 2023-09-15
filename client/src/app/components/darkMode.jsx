import React, {useEffect, useState} from 'react'
import {darkModeToggle, getDarkMode} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import PropTypes from 'prop-types'

const DarkMode = ({addClass, hide, children}) => {
  const [state, setState] = useState(localStorage.getItem('darkMode') === 'dark')
  const darkMode = useSelector(getDarkMode())
  const dispatch = useDispatch()

  useEffect(() => {
    darkMode === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [darkMode])

  const darkModeToggler = () => {
    !state
      ? localStorage.setItem('darkMode', 'dark')
      : localStorage.setItem('darkMode', 'light')

    dispatch(darkModeToggle({status: localStorage.getItem('darkMode')}))
    setState(!state)
  }

  return (
    <>
    <span className={addClass} onClick={darkModeToggler}>
      {children}
      Dark mode
    </span>
      <button
        className={'dark-mode-btn ' + hide + (state ? ' dark-mode-btn__active' : '')}
        onClick={darkModeToggler}
      >
        <img className="dark-mode-btn__sun" src={sun} alt="sun" />
        <img className="dark-mode-btn__moon" src={moon} alt="moon" />
      </button>
    </>
  )
}

DarkMode.propTypes = {
  addClass: PropTypes.string.isRequired,
  hide: PropTypes.string,
  children: PropTypes.node
}

export default DarkMode