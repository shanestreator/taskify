import React from 'react'
import { Board as B } from '../../types'
import List from '../List/List'

const Board = ({lists}: B) => {
  return (
    <div className='board'>
      <div className='column'>
        {
          lists.map((l) => (
            <List key={l.id} {...l} />
          ))
        }
      </div>
    </div>
  )
}

export default Board