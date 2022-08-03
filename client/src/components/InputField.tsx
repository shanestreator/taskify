import React, { useRef } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import './styles.css'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        onSubmit(e)
        inputRef.current?.focus()
      }}
    >
      <input
        ref={inputRef}
        type="input" 
        placeholder='Enter task' 
        className='input__box' 
        value={todo}
        onChange={(e) => setTodo(e.target.value) } 
      />  
      <button className="input_submit" type='submit'><BsPlusLg /></button>
    </form>
  )
}

export default InputField