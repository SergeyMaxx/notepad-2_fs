import {createSlice} from '@reduxjs/toolkit'
import noteService from '../services/note.service'
import trashService from '../services/trash.service'
import favoriteService from '../services/favorite.service'

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    noteState: [],
    basketState: [],
    favoritesState: [],
    error: [],
    loading: true,
    settingsOn: false,
    burgerOn: false,
    isDarkMode: localStorage.getItem('darkMode') || 'light'
  },
  reducers: {
    getNotesSuccess(state, action) {
      state.noteState = action.payload
      state.loading = false
    },
    getBasketSuccess(state, action) {
      state.basketState = action.payload
      state.loading = false
    },
    getFavoritesSuccess(state, action) {
      state.favoritesState = action.payload
      state.loading = false
    },
    getNotesFail(state, action) {
      state.error = action.payload
      state.loading = false
    },
    newNotes(state, action) {
      state.noteState.push(action.payload)
    },
    edit(state, action) {
      const noteIndex = state.noteState.findIndex(el => el.id === action.payload.id)
      state.noteState[noteIndex] = {
        ...state.noteState[noteIndex],
        ...action.payload
      }

      const index = state.favoritesState.findIndex(el => el.id === action.payload.id)
      state.favoritesState[index] = {
        ...state.favoritesState[index],
        ...action.payload
      }
    },
    remove(state, action) {
      state.basketState = [
        ...state.basketState,
        ...state.noteState.filter(el => el.id === action.payload.id)
      ]
      state.noteState = [...state.noteState.filter(el => el.id !== action.payload.id)]
      state.favoritesState = [...state.favoritesState.filter(el => el.id !== action.payload.id)]
    },
    removeAll(state) {
      state.basketState = []
    },
    restore(state, action) {
      const newStatus = state.basketState.find(el => el.id === action.payload.id)

      if (newStatus.favoritesStatus) {
        state.noteState = [
          ...state.noteState,
          ...state.basketState.filter(el => el.id === action.payload.id)
        ]
        state.favoritesState = [
          ...state.favoritesState,
          ...state.basketState.filter(el => el.id === action.payload.id)
        ]
        state.basketState = [...state.basketState.filter(el => el.id !== action.payload.id)]
      } else {
        state.noteState = [
          ...state.noteState,
          ...state.basketState.filter(el => el.id === action.payload.id)
        ]
        state.basketState = [...state.basketState.filter(el => el.id !== action.payload.id)]
      }
    },
    toggler(state, action) {
      const newStatus = state.noteState.find(el => el.id === action.payload.id)
      newStatus.favoritesStatus = !newStatus.favoritesStatus
      state.noteState = [...state.noteState]
    },
    favorites(state, action) {
      const status = state.noteState.find(note => note.id === action.payload.id)
      status.favoritesStatus
        ? state.favoritesState = [
          ...state.favoritesState,
          ...state.noteState.filter(el => el.id === action.payload.id)
        ]
        : state.favoritesState = [...state.favoritesState.filter(el => el.id !== action.payload.id)]
    },
    cancelFavorites(state, action) {
      const status = state.favoritesState.find(el => el.id === action.payload.id)
      status.favoritesStatus = !status.favoritesStatus
      state.favoritesState = [...state.favoritesState]

      const newStatus = state.noteState.find(el => el.id === action.payload.id)
      newStatus.favoritesStatus = !newStatus.favoritesStatus
      state.noteState = [...state.noteState]
    },
    deleteFavorites(state, action) {
      state.favoritesState = [...state.favoritesState.filter(el => el.id !== action.payload.id)]
    },
    settingsOpen(state, action) {
      state.settingsOn = action.payload.status
    },
    burgerOpen(state, action) {
      state.burgerOn = action.payload.status
    },
    toggleDarkMode(state, action) {
      state.isDarkMode = action.payload.status
    }
  }
})

const {reducer} = noteSlice
const {
  getNotesSuccess,
  getBasketSuccess,
  getFavoritesSuccess,
  getNotesFail,
  newNotes,
  edit,
  remove,
  removeAll,
  restore,
  favorites,
  cancelFavorites,
  toggler,
  deleteFavorites,
  settingsOpen,
  burgerOpen,
  toggleDarkMode
} = noteSlice.actions

export function loadNotes() {
  return async dispatch => {
    try {
      const {content} = await noteService.get()
      dispatch(getNotesSuccess(content))

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function loadNotesTrash() {
  return async dispatch => {
    try {
      const {content} = await trashService.get()
      dispatch(getBasketSuccess(content))

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function loadNotesFavorites() {
  return async dispatch => {
    try {
      const {content} = await favoriteService.get()
      dispatch(getFavoritesSuccess(content))

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function createNote(note) {
  return async dispatch => {
    try {
      dispatch(newNotes(note))
      await noteService.create(note)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function noteDelete(note) {
  return async dispatch => {
    try {
      dispatch(remove({id: note.id}))
      await trashService.create(note)
      await noteService.remove(note.id)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function noteDeleteAll() {
  return async dispatch => {
    try {
      dispatch(removeAll())
      await trashService.removeAll()

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function noteReturn(note) {
  return async dispatch => {
    try {
      dispatch(restore({id: note.id}))
      await noteService.create(note)
      await trashService.remove(note.id)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function noteReturnAll(note) {
  return async dispatch => {
    try {
      dispatch(restore({id: note.id}))
      await noteService.create(note)
      await favoriteService.create(note)
      await trashService.remove(note.id)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function addFavorites(note) {
  return async dispatch => {
    try {
      dispatch(toggler({id: note.note.id}))
      dispatch(favorites({id: note.note.id}))
      await noteService.updateStatus(note)
      await favoriteService.toggle(note)
      await favoriteService.updateStatus(note)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function favoritesOff(note) {
  return async dispatch => {
    try {
      dispatch(cancelFavorites({id: note.note.id}))
      dispatch(deleteFavorites({id: note.note.id}))
      await noteService.updateStatus(note)
      await favoriteService.toggle(note)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function removeFavorites(id) {
  return async dispatch => {
    try {
      await favoriteService.remove(id)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function change(data) {
  return async dispatch => {
    try {
      dispatch(edit(data))
      await noteService.update(data)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export function changeFavorites(data) {
  return async dispatch => {
    try {
      dispatch(edit(data))
      await noteService.update(data)
      await favoriteService.update(data)

    } catch (error) {
      dispatch(getNotesFail(error.message))
    }
  }
}

export const getNotes = () => state => state.notesReducer.noteState
export const getBasketNotes = () => state => state.notesReducer.basketState
export const getFavoritesNotes = () => state => state.notesReducer.favoritesState
export const getLoading = () => state => state.notesReducer.loading
export const getError = () => state => state.notesReducer.error
export const getSettingsOpen = () => state => state.notesReducer.settingsOn
export const getBurgerOpen = () => state => state.notesReducer.burgerOn
export const getDarkMode = () => state => state.notesReducer.isDarkMode
export const openSettings = status => settingsOpen(status)
export const openBurger = status => burgerOpen(status)
export const darkModeToggle = status => toggleDarkMode(status)

export default reducer