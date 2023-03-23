import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../loader'
import {getDataStatus, loadUsersList} from '../../Store/auth'

const UsersLoader = ({children}) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList())
    }
  }, [])

  if (!dataStatus) {
    return <Loader/>
  }

  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader