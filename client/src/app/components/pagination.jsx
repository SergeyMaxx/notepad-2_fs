import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({userNotes, currentPage, setCurrentPage, pageSize}) => {
  const pageCount = Math.ceil(userNotes.length / pageSize)

  if (pageCount <= 1) {
    return null
  }

  const pages = _.range(1, pageCount + 1)
  const minus = +currentPage > 1 ? +currentPage - 1 : +currentPage
  const plus = currentPage !== pages[pages.length - 1] ? +currentPage + 1 : +currentPage

  return (
    <div className="wrap-page">
      <div className="div-page" onClick={() => setCurrentPage(minus)}>
        {'<<'}
      </div>
      <ul className="note-list__container_page-list">
        {pages.map(page => (
          <li
            className={
              'note-list__container_page-list-item' + (page === currentPage ? ' page-active' : '')
            }
            key={'page_' + page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
      <div className="div-page" onClick={() => setCurrentPage(plus)}>
        {'>>'}
      </div>
    </div>

  )
}

Pagination.propTypes = {
  userNotes: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination