import localStorageService, {getAccessToken, getUserId} from '../services/localStorage.service'
import {createAction, createSlice} from '@reduxjs/toolkit'
import {generateAuthError} from '../utils/generateAuthError'
import userService from '../services/user.service'

const initialState = getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: {userId: getUserId()},
    isLoggedIn: true,
    dataLoaded: false,
    flag: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false,
    flag: false
  }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    usersRequested(state) {
      state.isLoading = true
    },
    usersReceived(state, action) {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed(state, action) {
      state.error = action.payload
    },
    userLoggedOut(state) {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdateName(state, action) {
      state.entities.find(u => u._id === action.payload.userId).name = action.payload.name
    },
    userUpdateAvatar(state, action) {
      state.entities.find(u => u._id === action.payload.userId).image = action.payload.image
    },
    authRequested(state) {
      state.error = null
    },
    toggleFlag(state) {
      state.flag = true
    }
  }
})

const {reducer: auth} = authSlice
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  userUpdateName,
  userUpdateAvatar,
  authRequested,
  toggleFlag
} = authSlice.actions

const userUpdateFailed = createAction('auth/userUpdateFailed')

export const login = data => {
  return async dispatch => {
    localStorageService.setTokens(data)
    dispatch(loadUsersList())
    dispatch(authRequestSuccess({userId: data.userId}))
  }
}

export const signUp = data => {
  return async dispatch => {
    localStorageService.setTokens(data)
    dispatch(loadUsersList())
    dispatch(authRequestSuccess({userId: data.userId}))
  }
}

export const getError = data => {
  return dispatch => {
    const {code, message} = data.response.data.error

    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(authRequestFailed(errorMessage))
    } else {
      dispatch(authRequestFailed(data.message))
    }
  }
}

export const logOut = () => {
  return dispatch => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
  }
}

export const loadUsersList = () => {
  return async dispatch => {
    dispatch(usersRequested())
    try {
      const {content} = await userService.get()
      dispatch(usersReceived(content))

    } catch (error) {
      dispatch(usersRequestFailed(error.message))
    }
  }
}

export const updateUserName = payload => {
  return async dispatch => {
    try {
      dispatch(userUpdateName(payload))
      await userService.updateName(payload)

    } catch (error) {
      dispatch(userUpdateFailed(error.message))
    }
  }
}

export const updateUserAvatar = payload => {
  return async dispatch => {
    try {
      dispatch(userUpdateAvatar(payload))
      await userService.updateAvatar(payload)

    } catch (error) {
      dispatch(userUpdateFailed(error.message))
    }
  }
}

export const deleteAccount = payload => {
  return async dispatch => {
    try {
      await userService.remove(payload)
      dispatch(toggleFlag())

    } catch (error) {
      dispatch(userUpdateFailed(error.message))
    }
  }
}

export const errorNull = () => authRequested()
export const getFlag = () => state => state.authReducer.flag
export const getIsLoggedIn = () => state => state.authReducer.isLoggedIn
export const getDataStatus = () => state => state.authReducer.dataLoaded
export const getUsersLoadingStatus = () => state => state.authReducer.isLoading
export const getAuthErrors = () => state => state.authReducer.error
export const getCurrentUserData = () => state => state.authReducer.entities.find(u => {
  return u._id === state.authReducer.auth.userId
})

export default auth