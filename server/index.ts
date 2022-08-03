import express, { Express, Request, Response } from 'express'
import apiTodos from './api/v1/todos'

const app: Express = express()

app.use(express.json())

// Routes
app.use('/api/todos', apiTodos)

app.get('/', (req: Request, res: Response) => {
	res.send('Typescript and node works')
})

app.listen(4321, () => {
	console.log('Running on port 4321')
})