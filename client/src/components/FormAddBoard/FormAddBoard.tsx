import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import request from '../../lib/request'
import Loader from '../Loader'

const FormAddBoard = ({ refetch }: any) => {
	const [boardName, setBoardName] = useState('')

	const addBoard = async (data: any) => await request.post('/api/boards', { name: boardName })

	const { data, isLoading, isError, error, mutate } = useMutation([], addBoard)

	const onSubmit = (e: FormDataEvent) => {
		e.preventDefault()
		
		mutate({ name: boardName })
		
		setTimeout(() => {
			refetch()
		}, 3000)

	}

	if (isLoading) return <Loader height="300px" />

	return (
		<>
			{
				data?.success ? (
					<div className="success">
						Successfully made {data.board.name}!
					</div>
				) : (
					<form className='form_new_board' onSubmit={(e: any) => onSubmit(e)}>
						<input
							type="text"
							value={boardName} 
							onChange={(e: any) => setBoardName(e.target.value)}
						/>

						<button type='submit'>submit</button>
					</form>
				)
			}
		</>
	)
}

export default FormAddBoard