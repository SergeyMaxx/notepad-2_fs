import {useEffect, useState} from 'react'
import {getUserId} from '../services/localStorage.service'
import _ from 'lodash'
import {paginate} from '../utils/paginate'

const useSortPaginate = data => {
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})

  const userNotes = data.filter(n => n.userId === getUserId())
  const pageSize = 15
  const pageCount = Math.ceil(userNotes.length / pageSize)

  const notesSearch = userNotes.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(notesSearch, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedNotes, currentPage, pageSize)

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount)
    }
  }, [userNotes.length, currentPage, pageCount])

  return {
    setSortBy,
    userNotes,
    pageSize,
    pageCount,
    currentPage,
    setCurrentPage,
    setSearchText,
    userCrop
  }
}

export default useSortPaginate