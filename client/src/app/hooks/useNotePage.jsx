import {useEffect} from 'react'

const useNotePage = (state, id) => {
  let note = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(note))
  }, [state])

  state.length
    ? note = state.find(note => note.id === id)
    : note = JSON.parse(localStorage.getItem('current-notes'))

  return note
}

export default useNotePage