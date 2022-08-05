import React from 'react'
import { List as L } from '../../types'
import AddList from '../AddList/AddList'
import Task from '../Task/Task'


const List = ({id, name, listIndex, tasks}: L) => {
  return (
    <div className='list_column'>
      {
        Array.isArray(tasks) && tasks.length ? (
          <>
            <h3>{name}</h3>
            {tasks.map(t => (
              <Task key={t.id} {...t} />
            ))}
          </>
        ) : (
          <AddList />
        )
      }
      
    </div>
  )
}

export default List