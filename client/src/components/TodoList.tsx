import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'
import { v4 as uuidv4 } from 'uuid'
import './styles.css'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
    <div className="container">
      <Droppable droppableId='ActiveList'>
        {(provided, snapshot) => (
          <div className={`todos active ${snapshot.isDraggingOver ? 'drag-active' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Active</span>
            {todos.map((t, i) => (
              <SingleTodo key={t.id} uuid={uuidv4()} index={i} todo={t} todos={todos} setTodos={setTodos} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <Droppable droppableId='CompleteList'>
        {(provided, snapshot) => (
          <div className={`todos complete ${snapshot.isDraggingOver ? 'drag-complete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Complete</span>
            {completedTodos.map((t, i) => (
              <SingleTodo key={t.id} uuid={uuidv4()} index={i} todo={t} todos={completedTodos} setTodos={setCompletedTodos} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList