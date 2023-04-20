import {openSettings} from '../Store/notes'

export const handelCancel = (e, dispatch) => {
  if (e.target.classList.contains('note-list__wrapper') ||
    e.target.classList.contains('note-list__grid') ||
    e.target.classList.contains('note-list__container')) {
    dispatch(openSettings({status: false}))
  }
}