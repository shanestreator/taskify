import express, { Response } from 'express'
import { cache } from '../../index'
import { randomUUID } from 'crypto'

const router = express.Router()

// @route    GET api/v1/boards/lists/:boardId
// @desc     Get all lists that belong to a board
// @access   Public
router.get('/:boardId', (req, res) => {
  const node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })

  const { boardId } = req.params

  const board = node.boards.filter((b: any) => b.id === boardId)
  if (!board.length) return res.status(400).send({ success: false, error: 'invalid board id' })
  
  res.status(200).send({ success: true, lists: board.lists })
})

// @route    GET api/v1/boards/lists/:boardId/:listId
// @desc     Get a single lists that belongs to a board
// @access   Public
router.get('/:boardId/:listId', (req, res) => {
  const node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })

  const { boardId, listId } = req.params
  
  const board = node.boards.filter((b: any) => b.id === boardId)
  if (!board.length) return res.status(400).send({ success: false, error: 'invalid board id' })
  
  const list = board[0].lists.filter((l: any) => l.id === listId)
  if (!list.length) return res.status(400).send({ success: false, error: 'invalid list id' })

  res.status(200).send({ success: true, list })
})

// @route    POST api/v1/boards/lists
// @desc     Create a new list on a board
// @access   Public
router.post('/', (req, res) => {
  const node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })
  
  const { boardId, name } = req.body
  if (!name) return res.status(400).send({ success: false, error: 'list name required' })
  if (!boardId) return res.status(400).send({ success: false, error: 'board id required' })
  
  const board = node.boards.filter((b: any) => b.id === boardId)
  if (!board.length) return res.status(400).send({ success: false, error: 'invalid board id' })

  const newList = {
    id: randomUUID(),
    name,
    tasks: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }

  const boards = node.boards.reduce((acc: any, cur: any) => {
    if (cur.id === boardId) {
      acc = [...acc, { ...cur, lists: [...cur.lists, newList] }]
    } else {
      acc = [...acc, cur]
    }
    return acc
  }, [])

  cache.set(req.ip, {
    ...node,
    boards: [...boards]
  })

  res.status(200).send({
    success: true,
    boards: cache.get(req.ip).boards 
  })
})

// @route    PUT api/v1/boards/lists
// @desc     Update a list name
// @access   Public
router.put('/', (req, res) => {
  const node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })

  const { boardId, listId, name } = req.body
  if (!name) return res.status(400).send({ success: false, error: 'new list name required' })
  if (!boardId) return res.status(400).send({ success: false, error: 'board id required' })

  const board = node.boards.filter((b: any) => b.id === boardId)
  if (!board.length) return res.status(400).send({ success: false, error: 'invalid board id' })

  let list = board[0].lists.filter((l: any) => l.id === listId)
  if (!list.length) return res.status(400).send({ success: false, error: 'invalid list id' })

  node.boards = node.boards.reduce((acc: any, cur: any) => {
    if (cur.id === boardId) {
      acc = [ ...acc, {
        ...cur,
        lists: cur.lists.map((l: any) => {
          if (l.id === listId) {
            l.name = name
            l.updatedAt = Date.now()
          }
          return l
        })
      }]
    } else {
      acc = [ ...acc, cur ]
    }
    
    return acc
  }, [])
  
  cache.set(req.ip, {
    ...node,
    boards: [ ...node.boards ]
  })

  res.status(200).send({ success: true, list })

})


export default router