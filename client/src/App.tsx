import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} onSubmit={onSubmit} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  )
}

export default App