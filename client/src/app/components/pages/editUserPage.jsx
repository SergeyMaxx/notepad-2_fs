import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import pen from '../../../icons/pen.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getUserId} from '../../services/localStorage.service'
import {
  deleteAccount,
  getCurrentUserData,
  getFlag,
  logOut,
  updateUserAvatar,
  updateUserName
} from '../../Store/auth'

const EditUserPage = ({active, setActive}) => {
  const [editName, setEditName] = useState(false)
  const [editAvatar, setEdiAvatar] = useState(false)
  const [dangerZone, setDangerZone] = useState(false)
  const currentUser = useSelector(getCurrentUserData())
  const flag = useSelector(getFlag())
  const [edit, setEdit] = useState(currentUser.name)
  const [userDelete, setUserDelete] = useState('')
  const dispatch = useDispatch()

  const handleSaveName = e => {
    e.preventDefault()
    dispatch(updateUserName({
      name: edit,
      userId: getUserId()
    }))
    setEditName(!editName)
  }

  const handleSaveAvatar = () => {
    const image = `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36).substring(7)}.svg`
    dispatch(updateUserAvatar({image, userId: getUserId()}))
    setEdiAvatar(!editAvatar)
  }

  const handleDeleteAccount = e => {
    e.preventDefault()
    if (userDelete === currentUser.name) {
      dispatch(deleteAccount({
        data: {userId: getUserId()}
      }))
    }
  }

  useEffect(() => {
    if (flag) {
      dispatch(logOut())
    }
  }, [flag])

  const handelCancel = e => {
    e.stopPropagation()
    e.target.classList.contains('user-page') && setEditName(false)
    e.target.classList.contains('user-page') && setEdiAvatar(false)
    e.target.classList.contains('user-page') && setDangerZone(false)
    e.target.classList.contains('user-page') && setUserDelete('')
  }

  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'user-page user-page-active' : 'user-page'}
        onClick={handelCancel}
      >
        <img
          className={'avatar-edit' + (editAvatar ? ' hide' : '')}
          onClick={() => setEdiAvatar(!editAvatar)}
          src={pen}
          alt="pen logo"
        />
        {editAvatar &&
          <button className="profile-save avatar-save" onClick={handleSaveAvatar}>
            change
          </button>
        }
        <img
          className="user-page-avatar"
          src={currentUser.image}
          alt={`${currentUser.name}'s avatar`}
        />
        <div className="profile-name">
          {editName
            ? (<form className="profile-container" onSubmit={handleSaveName}>
              <input
                className="profile-input"
                name="name"
                type="text"
                value={edit.toString()}
                onChange={e => setEdit(e.target.value)}
              />
              <button className="profile-save" type="submit">
                save
              </button>
            </form>)
            : currentUser.name
          }
          <img
            className={'name-edit' + (editName ? ' hide' : '')}
            onClick={() => setEditName(true)}
            src={pen}
            alt="pen logo"
          />
        </div>
        <div className="profile-name">
          {currentUser.email}
        </div>
        <div className="danger-zone" onClick={() => setDangerZone(true)}>
          {dangerZone
            ?
            (<form className="profile-container" onSubmit={handleDeleteAccount}>
              <div>Please type your name to confirm</div>
              <input
                className="profile-input"
                name="remove"
                type="text"
                onChange={e => setUserDelete(e.target.value)}
              />
              <button
                className={'profile-save ' + (userDelete ? 'danger-active' : 'danger')}
                type="submit"
              >
                I understand the consequences, delete this account
              </button>
            </form>)
            : <div>Danger Zone</div>
          }
        </div>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  remove: PropTypes.func,
  confirmationText: PropTypes.string,
  buttonText: PropTypes.string
}

export default EditUserPage