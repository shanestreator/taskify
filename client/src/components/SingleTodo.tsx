import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { TbEdit } from 'react-icons/tb'
import { IoMdClose } from 'react-icons/io'
import { TbChecks } from 'react-icons/tb'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  uuid: string,
  index: number,
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ uuid, index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const onDone = (id: number) => {
    setTodos(todos.map(t => t.id === id ? {...t} : t))
  }

  const onSave = (id: number) => {
    setTodos(todos.map(t => t.id === id ? {...t, todo: editTodo} : t))
    setEdit(!edit)
  }

  const onDelete = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const onSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(todos.map(t => t.id === id ? {...t, todo: editTodo} : t))
    setEdit(false)
    setEditTodo(todo.todo)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index} key={uuid}>
      {(provided) => (
        <form
          className='todos__single'
          onSubmit={(e) => onSubmit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {
            edit ? (
              <input ref={inputRef} className='todos__single--text edit-mode' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )
          }
          <div>
            <span className="icon" onClick={() => !edit ? setEdit(!edit) : onSave(todo.id)}>
              {!edit ? <TbEdit /> : <TbChecks />}
            </span>
            <span className="icon" onClick={() => onDelete(todo.id)}><IoMdClose /></span>
            {/* <span className="icon" onClick={() => !edit ? onDone(todo.id) : null}></span> */}
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo