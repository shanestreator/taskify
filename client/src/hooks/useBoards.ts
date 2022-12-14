import { useQuery, useMutation } from '@tanstack/react-query'
import request from '../lib/request'

const fetchAllBoards = async () => await request.get('/api/boards')
export const useGetAllBoards = () => useQuery(['boards'], fetchAllBoards)

const fetchBoard = async (id: string) => await request.get(`/api/boards/${id}`)
export const useGetBoard = (id: string) => useQuery(['boards'], () => fetchBoard(id))

const createBoard = async (data: any) => await request.post('/api/boards', data)
export const useCreateBoard = (data: any) => useMutation(() => createBoard(data))

const updateBoard = async (id: string, data: any) => await request.put(`/api/boards/${id}`, data)
export const useUpdateBoard = (id: string, data: any) => useMutation(() => updateBoard(id, data))

const deleteBoard = async (id: string) => await request.delete(`/api/boards/${id}`)
export const useDeleteBoard = (id: string): any => {
	console.log({ id })
	return useMutation(() => deleteBoard(id))
}
