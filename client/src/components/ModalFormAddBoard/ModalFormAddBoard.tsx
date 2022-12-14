import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import ReactModal from 'react-modal';
import request from '../../lib/request';
import Loader from '../Loader';

const FormAddBoard = ({ isOpen, refetchBoards }: any) => {
	const [boardName, setBoardName] = useState('');

	const addBoard = async (data: any) =>
		await request.post('/api/boards', { name: boardName });

	const { data, isLoading, isError, error, mutate } = useMutation([], addBoard);

	const onSubmit = (e: FormDataEvent) => {
		e.preventDefault();

		mutate({ name: boardName });

		setTimeout(() => {
			refetchBoards();
		}, 3000);
	};

	if (isLoading) return <Loader height="300px" />;

	return (
		<ReactModal
			isOpen={isOpen}
			contentLabel="onRequestClose Example"
			// onRequestClose={null}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}>
			{data?.success ? (
				<h3>Successfully made {data?.board.name}!</h3>
			) : (
				<>
					<h3>Create a board to get started!</h3>
					<form className="form_new_board" onSubmit={(e: any) => onSubmit(e)}>
						<input
							type="text"
							value={boardName}
							onChange={(e: any) => setBoardName(e.target.value)}
						/>

						<button type="submit">submit</button>
					</form>
				</>
			)}
		</ReactModal>
	);
};

export default FormAddBoard;
