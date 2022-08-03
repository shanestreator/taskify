import express from 'express'
import fs from 'fs'

const router = express.Router()

router.get('/', (req, res) => {
	try {
		const ip: string | any = req.socket.remoteAddress
		const data = JSON.parse(fs.readFileSync(`data/${ip}.json`, 'utf-8'))
		const todos = data.todos

		if (!todos || !todos.length) return res.status(400).send('tasks do not exist')
		
		res.send(todos)

	} catch (error: any) {
		console.error(error.message)
    	res.status(500).send('Server Error')
	}
})

router.get('/:id', (req, res) => {
	try {
		const ip: string | any = req.socket.remoteAddress
		const data = JSON.parse(fs.readFileSync(`data/${ip}.json`, 'utf-8'))
		const id: string = req.params?.id
		const todo = data.todos.filter((t: any) => t.id == id)

		if (!todo || !todo.length) return res.status(400).send('task does not exist')
		
		res.send(todo)

	} catch (error: any) {
		console.error(error.message)
    	res.status(500).send('Server Error')
	}
})

router.post('/:id', (req, res) => {
	try {
		const ip: string | any = req.socket.remoteAddress
		const data = JSON.parse(fs.readFileSync(`data/${ip}.json`, 'utf-8'))

		// check if ip address exists
		// const ipExists = validateIp(ip)
		// if (!ipExists) {
		// 	// create new ${ip}.json file in data folder
		// }

		const todos = data.todos

		const map1 = new Map();

		map1.set('a', 1);
		map1.set('b', 2);
		map1.set('c', 3);

		res.send(todos)

	} catch (error: any) {
		console.error(error.message)
    	res.status(500).send('Server Error')
	}
})

router.put('/:id', (req, res) => {})

export default router