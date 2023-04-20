export const handleSort = setSortBy => {
  setSortBy(prevState => ({
    ...prevState,
    order: prevState.order === 'asc' ? 'desc' : 'asc'
  }))
}