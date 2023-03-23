import React from 'react'
import NavBar from './components/navBar'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './layouts/login'
import Register from './layouts/register'
import Notes from './layouts/notes'
import DeletedNotes from './layouts/deletedNotes'
import './SCSS/note.scss'
import FavoritesNotes from './layouts/favoritesNotes'
import Main from './layouts/main'
import ProtectedRoute from './components/protectedRoute'
import AppLoader from './components/hoc/appLoader'

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar/>
        <Switch>
          <Route path="/signIn" component={Login}/>
          <Route path="/signUp" component={Register}/>
          <ProtectedRoute path="/trash/:deletedNoteId?" component={DeletedNotes}/>
          <ProtectedRoute path="/favorites/:favoritesNoteId?" component={FavoritesNotes}/>
          <ProtectedRoute path="/notes/:noteId?" component={Notes}/>
          <Route path="/" exact component={Main}/>
          <Redirect to="/"/>
        </Switch>
      </AppLoader>
    </div>
  )
}

export default App