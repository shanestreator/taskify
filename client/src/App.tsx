import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import request from './lib/request'
import { useQuery } from '@tanstack/react-query'
import Board from './components/Board/Board'
import './styles.scss'
import Loader from './components/Loader'
import BoardHeader from './components/BoardHeader/BoardHeader'
import ModalFormAddBoard from './components/ModalFormAddBoard/ModalFormAddBoard'
import { useGetAllBoards } from './hooks/useBoards'

const App: React.FC = () => {
	const [showModal, setShowModal] = React.useState(false)

	const toggleModal = () => setShowModal((state) => !state)

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

	const { data, isLoading, isError, error, refetch: refetchBoards } = useGetAllBoards()

	if (isLoading) return <Loader />
	if (isError) return <p>Error: {`${error}`}</p>

	const { success, boards } = data

	return (
		<div className="App">
			<BoardHeader boards={boards} refetchBoards={refetchBoards} />

			{!success ? (
				<ModalFormAddBoard isOpen={!success} refetchBoards={refetchBoards} />
			) : (
				<div>
					boards exists
					{/* <Board lists={boards[0].lists} /> */}
				</div>
			)}
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
