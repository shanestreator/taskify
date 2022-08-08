import { useState } from 'react'
import Select from 'react-select';

const BoardHeader = ({ boards }: any) => {
	const [selectedOption, setSelectedOption] = useState(null);

	let boardOptions = boards ? boards.map((b: any) => ({ value: b.name, label: b.name })) : [{ value: 'new', label: 'Create board' }]

	const customStyles = {
		control: (provided: any, state: any) => ({
			...provided,
			borderRadius: state.menuIsOpen ? '4px 4px 0 0' : '4px'
		})
	}
	
	return (
		<div className='board__header'>
			<Select
				className='react-select-container'
				classNamePrefix='react-select'
				value={selectedOption}
				onChange={setSelectedOption}
				options={boardOptions}
				styles={customStyles}
			/>
		</div>
	)
}

export default BoardHeader