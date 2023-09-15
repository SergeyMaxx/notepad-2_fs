import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getDarkMode} from '../Store/notes'

const Pagination = ({pageCount, currentPage, setCurrentPage}) => {
  const darkMode = useSelector(getDarkMode())

  const pages = _.range(1, pageCount + 1)
  const minus = +currentPage > 1 ? +currentPage - 1 : +currentPage
  const plus = currentPage !== pages[pages.length - 1] ? +currentPage + 1 : +currentPage

  return (
    <div className="wrap-page">
      <div
        className={'div-page ' + (darkMode === 'dark' ? 'div-page-dark' : darkMode)}
        onClick={() => setCurrentPage(minus)}>
        {'<<'}
      </div>
      <ul className="note-list__container_page-list">
        {pages.map(page => (
          <li
            className={'note-list__container_page-list-item' + (page === currentPage ? ' page-active' : '')}
            key={'page_' + page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
      <div
        className={'div-page ' + (darkMode === 'dark' ? 'div-page-dark' : darkMode)}
        onClick={() => setCurrentPage(plus)}
      >
        {'>>'}
      </div>
    </div>

  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination