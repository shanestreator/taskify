import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import Select from 'react-select'
import request from '../../lib/request'
import { useCreateBoard, useDeleteBoard, useGetAllBoards } from '../../hooks/useBoards'

const noBoards = { value: 'none', label: 'No boards' }

const BoardHeader = ({ boards, refetchBoards }: any) => {
	const [selectedOption, setSelectedOption] = useState(noBoards)
	const [options, setOptions] = useState([noBoards])

	useEffect(() => {
		console.log({ boards })
		setOptions(
			boards
				? boards.map((b: any) => {
						const optionValue = { value: b.id, label: b.name }
						if (b.selected) setSelectedOption(optionValue)
						return optionValue
				  })
				: [noBoards]
		)
	}, [boards])

	const onCreate = () => {}

	const { mutate: deleteBoard } = useDeleteBoard(selectedOption.value)

	const onDelete = () => {
		const { value: id, label: name } = selectedOption
		const confirmed = confirm(`Are you sure you want to delete ${name}?`)
		if (confirmed) {
			deleteBoard(id)
			setTimeout(() => {
				refetchBoards()
			}, 300)
		}
	}

	return (
		<div className="board__header">
			<Select
				className="react-select-container"
				classNamePrefix="react-select"
				value={selectedOption}
				onChange={(e: any) => setSelectedOption(e)}
				options={options}
				styles={customStyles}
			/>
			<div className="board__header_control">
				<button onClick={onDelete}>Delete</button>
				<button onClick={onCreate}>Create New Board</button>
			</div>
		</div>
	)
}

const customStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		borderRadius: state.menuIsOpen ? '4px 4px 0 0' : '4px'
	})
}

export default BoardHeader
