import React, {useState} from 'react'
import PropTypes from 'prop-types'
import down from '../../assets/Polygon-down.svg'

const Sort = ({sort}) => {
  const [state, setState] = useState(false)

  const changeSort = () => {
    sort()
    setState(!state)
  }

  return (
    <div className="note-list__container_sort" onClick={changeSort}>
      <span className="note-list__container_sort-first">
        Newest
      </span>
      <img
        className={'sort-img-down ' + (state ? 'sort-img-up' : '')}
        src={down}
        alt="down logo"
      />
    </div>
  )
}

Sort.propTypes = {
  sort: PropTypes.func.isRequired
}

export default Sort