import React, {useEffect, useState} from 'react'
import EditUserPage from './pages/editUserPage'
import {openSettings} from '../Store/notes'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'

const EditUser = ({addClass, children}) => {
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    !modalActive && dispatch(openSettings({status: false}))
  }, [modalActive])

  return (
    <>
      <div className={addClass} onClick={() => setModalActive(true)}>
        {children}
        Settings
      </div>
      <EditUserPage active={modalActive} setActive={setModalActive}/>
    </>
  )
}

EditUser.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default EditUser