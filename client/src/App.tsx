import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import request from './lib/request'
import { useQuery } from '@tanstack/react-query'
import Board from './components/Board/Board'
import './styles.scss'

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
            belongsToList: 'list id',
            taskIndex: 0
          }
        ]
      }
    ]
  }
]

const App: React.FC = () => {

  const onDragEnd = (result: DropResult) => {
    // const { source, destination } = result
    
    // if (!destination) return
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) return
    
    // let moveTask
    // let active = todos
    // let complete = completedTodos

    // if (source.droppableId === 'ActiveList') {
    //   moveTask = active[source.index]
    //   active.splice(source.index, 1)
    // } else {
    //   moveTask = complete[source.index]
    //   complete.splice(source.index, 1)
    // }

    // if (destination.droppableId === 'ActiveList') {
    //   active.splice(destination.index, 0, moveTask)
    // } else {
    //   complete.splice(destination.index, 0, moveTask)
    // }

    // setTodos(active)
    // setCompletedTodos(complete)
  }

  const getBoards = async () => await request.get('/api/boards')

  const { data, isLoading, isError, error } = useQuery([], getBoards)
  
  console.log({data, isLoading, isError, error})

  return (
    <div className="App">
      <h3>Board: {boards[0].name}</h3>
      <Board lists={boards[0].lists} />
    </div>
    // <DragDropContext onDragEnd={onDragEnd}>
    //   <div className="App">
    //     <span className="heading">Taskify</span>
    //     <InputField todo={todo} setTodo={setTodo} onSubmit={onSubmit} />
    //     <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
    //   </div>
    // </DragDropContext>
  )
}

export default App