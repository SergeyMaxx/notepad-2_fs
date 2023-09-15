import {openBurger, openSettings} from '../Store/notes'

export const handelCancel = (e, dispatch) => {
  if (e.target.classList.contains('note-list__wrapper') ||
    e.target.classList.contains('note-list__grid') ||
    e.target.classList.contains('note-list__container') ||
    e.target.classList.contains('nav') ||
    e.target.classList.contains('nav-row') ||
    e.target.classList.contains('main')) {
    dispatch(openSettings({status: false}))
    dispatch(openBurger({status: false}))
  }
}