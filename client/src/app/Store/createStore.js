import {combineReducers, configureStore} from '@reduxjs/toolkit'
import reducer from './notes'
import auth from './auth'
import {thunk} from './middleware/thunk'

const rootReducer = combineReducers({
  notesReducer: reducer,
  authReducer: auth
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: defaultMiddleware => defaultMiddleware().concat(thunk)
  })
}