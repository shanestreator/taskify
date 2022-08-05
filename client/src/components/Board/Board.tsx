import React from 'react'
import { Board as B } from '../../types'
import List from '../List/List'

const boards = [
  {
    id: 'board id',
    name: 'board name',
    lists: [
      {
        id: 'list id',
        name: 'list name',
        listIndex: 0,
        tasks: [
          {
            id: 'task id',
            name: 'task name',
            belongsToList: 'list name',
            taskIndex: 0
          }
        ]
      }
    ]
  }
]

const Board = ({lists}: B) => {
  return (
    <div className='board'>
      {
        lists.map((l) => (
          <List key={l.id} {...l} />
        ))
      }
    </div>
  )
}

export default Board