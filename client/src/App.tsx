import React, { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import AddList from './components/AddList/AddList'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import request from './utils/request'
import { useQuery } from '@tanstack/react-query'

const TODO_URL = 'https://phemjson.com/todos'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo }])
      setTodo('')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return
    
    let moveTask
    let active = todos
    let complete = completedTodos

    if (source.droppableId === 'ActiveList') {
      moveTask = active[source.index]
      active.splice(source.index, 1)
    } else {
      moveTask = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'ActiveList') {
      active.splice(destination.index, 0, moveTask)
    } else {
      complete.splice(destination.index, 0, moveTask)
    }

    setTodos(active)
    setCompletedTodos(complete)
  }

  const getTodos = async () => await request.get(TODO_URL)

  const { data, isLoading, isError, error } = useQuery([], getTodos)
  
  console.log('isError: ', isError)
  console.log('isLoading: ', isLoading)
  console.log('data: ', data)

  if (isError) return <p>{`Error: ${error}`}</p>
  if (isLoading) return <p>Loading...</p>

  // const dummyTodo = { title: 'hello', status: 'IN_PROGRESS', order: 100 }
  // const dater = _todos.get(todoUrl)
  // console.log(dater)
  // _todos.add(dummyTodo)
  // _todos.update(id, todoData)
  // _todos.delete("6e0abb3c-8997-4116-a586-4fe7c7e0b9f1")

  return (
    <div className="App">
      <AddList />
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