import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import boards from './api/v1/boards'
import lists from './api/v1/lists'
import apiTodos from './api/v1/todos'
import { tempCache } from './lib/cache'

const app: Express = express()

app.use(express.json())
app.use(morgan('combined'))

export const cache = tempCache({ timeoutMs: 1000 * 60 })

app.use((req, res, next) => {
	const node = cache.get(req.ip)
  res.locals.node = node ? node : null
  next()
})

// Routes
app.use('/api/boards', boards)
app.use('/api/boards/lists', lists)
// app.use('/api/todos', apiTodos)

// app.get('/', (req: Request, res: Response) => {
// 	res.send('Typescript and node works')
// })

app.listen(5000, () => {
	console.log('Running on port 5000')
})