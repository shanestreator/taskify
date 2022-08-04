import express, { Response } from 'express'
import fs from 'fs'

const validateFile = (ip: string) => fs.existsSync(`data/${ip}.json`)
const getData = (ip: string) => JSON.parse(fs.readFileSync(`data/${ip}.json`, 'utf-8'))

const router = express.Router()


router.get('/', (req, res) => {
	const fileExists = validateFile(req.ip)
	if (!fileExists) return res.status(400).send({success: false})

	const data = getData(req.ip)
	
	res.send(data)
})


router.get('/:id', (req, res) => {
	const fileExists = validateFile(req.ip)
	if (!fileExists) return res.status(400).send({success: false})

	const data = getData(req.ip)
	const id: string = req.params.id
	const todo = data.todos.filter((t: any) => t.id == id)

	if (!todo || !todo.length) return res.status(400).send('task does not exist')
	
	res.send(todo)
})


router.post('/', (req, res) => {
	fs.writeFileSync(`data/${req.ip}.json`, JSON.stringify(req.body), { encoding:'utf8' })

	res.send({success: true})
})


router.put('/:id', (req, res) => {
	const fileExists = validateFile(req.ip)
	if (!fileExists) return res.status(400).send({success: false})

	
})


router.delete('/:id', (req, res) => {
	const fileExists = validateFile(req.ip)
	if (!fileExists) return res.status(400).send({success: false})

	const data = getData(req.ip)
	const id: string = req.params.id
	const todos = data.filter((t: any) => t.id != id)

	fs.writeFileSync(`data/${req.ip}.json`, JSON.stringify(todos), { encoding:'utf8' })

	res.send({success: true})
})

export default router