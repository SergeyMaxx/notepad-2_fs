import React from 'react'
import PropTypes from 'prop-types'
import glass from '../../icons/Glass.svg'

const Search = ({setSearchText}) => {
  return (
    <div className="note-list__container_search">
      <input
        type="text"
        className="note-list__container_search-input"
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search"
      />
      <img className="note-list__container_search-icon" src={glass} alt="glass logo"/>
    </div>
  )
}

Search.propTypes = {
  setSearchText: PropTypes.func
}

export default Search