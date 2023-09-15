import React, {useState} from 'react'
import {logOut} from '../Store/auth'
import ModalConfirmation from './modal/modalConfirmation'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'

const LogOut = ({addClass, children}) => {
  const [modalLogout, setModalLogout] = useState(false)
  const dispatch = useDispatch()

  return (
    <>
      <div className={addClass} onClick={() => setModalLogout(true)}>
        {children}
        Log out
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

LogOut.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default LogOut