import React, { FormEvent, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'

const AddList = () => {
  const [toggleInput, setToggleInput] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('e: ', e)
    
  }

  return (
    <div className="list_column">
      <form onSubmit={(e) => onSubmit(e)}>
        <span><BsPlusLg /> Add a list</span>
        <button className="input_submit" type='submit'></button>
      </form>
    </div>
  )
}

export default AddList