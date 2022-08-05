import React from 'react'
import { Task as T } from '../../types'

const Task = ({id, name, belongsToList, taskIndex}: T) => {
  return (
    <div>{name}</div>
  )
}

export default Task