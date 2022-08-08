import React, { useState } from 'react'
import { List as L } from '../../types'
import AddList from '../AddList/AddList'
import AddTask from '../AddTask/AddTask'
import Task from '../Task/Task'


const List = ({id, name, listIndex, tasks}: L) => {
  const [listName, setListName] = useState(name)

  return (
      <div className="list">
        <div className="list__header">
          <textarea value={listName} onChange={(e) => setListName(e.target.value)} />
        </div>

        <div className="list__body">
          {
            Array.isArray(tasks) && tasks.length && (
              <div className="tasks">
                {tasks.map(t => (
                  <Task key={t.id} {...t} />
                ))}
              </div>
            )
          }
        </div>

        <div className="list__footer">
          <AddTask />
        </div>
      </div>
  )
}

export default List