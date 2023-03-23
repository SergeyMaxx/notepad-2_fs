import React, {useState} from 'react'
import PropTypes from 'prop-types'
import down from '../../icons/Polygon down.svg'
import up from '../../icons/Polygon up.svg'

const Sort = ({sort}) => {
  const [state, setState] = useState(false)

  const changeSort = () => {
    sort()
    setState(prevState => !prevState)
  }

  return (
    <div className="note-list__container_sort" onClick={changeSort}>
      <span className="note-list__container_sort-first">First new</span>
      {state
        ? <img src={up} alt="up logo"/>
        : <img src={down} alt="down logo"/>
      }
    </div>
  )
}

Sort.propTypes = {
  sort: PropTypes.func.isRequired
}

export default Sort