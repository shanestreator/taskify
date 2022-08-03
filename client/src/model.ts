import React, { useReducer } from 'react'

export interface Todo {
  id: number
  todo: string
}

// type Actions = 
//   | { type: 'add', payload: string }
//   | { type: 'delete', payload: number }
//   | { type: 'done', payload: number }

// const TodoReducer = (state: Todo[], action: Actions) => {
//   switch (action.type) {
//     case 'add':
//       return [
//         ...state,
//         { id: Date.now(), todo: action.payload, isDone: false }
//       ]
//     case 'delete':
//       return state.filter(t => t.id !== action.payload)
//     case 'done':
//       return state.map(t => t.id === action.payload ? {...t, isDone: !t.isDone} : t)
//     default:
//       return state
//   }
// }

// const ReducerExample = () => {
//   const [state, dispatch] = useReducer(TodoReducer,[])

//   return (
//     <div>ReducerExample</div>
//   )
// }

// export default ReducerExample