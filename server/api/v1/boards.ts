import express, { Response } from 'express'
import { cache } from '../../index'
import { randomUUID } from 'crypto'

const router = express.Router()

// @route    Get api/v1/boards
// @desc     Get all boards
// @access   Public
router.get('/', (req, res) => {
  const node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })

  res.status(200).send({
    success: true,
    boards: node.boards
  })
})

// @route    Get api/v1/boards/:boardId
// @desc     Get board by id
// @access   Public
router.get('/:boardId', (req, res) => {
  const node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })

  res.status(200).send({
    success: true,
    board: 'work in progress'
  })
})

// @route    POST api/v1/boards
// @desc     Create board
// @access   Public
router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).send({ success: false, error: 'board name required' })

  const newBoard = {
    id: randomUUID(),
    name,
    lists: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }

  let node = res.locals.node

  if (!node) {
    cache.set(req.ip, {
      boards: [
        newBoard
      ]
    })
  } else {
    cache.set(req.ip, {
      ...node,
      boards: [
        ...node.boards,
        newBoard
      ]
    })
  }

  node = cache.get(req.ip)

  res.status(200).send({
    success: true,
    boards: node.boards 
  })
})

// @route    PUT api/v1/boards
// @desc     Update board name
// @access   Public
router.put('/', (req, res) => {
  let node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })
  
  const { boardId, name } = req.body
  const board = node.boards.filter((b: any) => b.id === boardId)

  if (!name) return res.status(400).send({ success: false, error: 'new board name required' })
  if (!boardId) return res.status(400).send({ success: false, error: 'board id required' })
  if (!board.length) return res.status(400).send({ success: false, error: 'invalid board id' })

  node.boards = node.boards.reduce((acc: any, cur: any) => {
    if (cur.id === boardId) {
      const updatedBoard = { ...cur, name, updatedAt: Date.now() }
      acc = [ ...acc, updatedBoard ]
    } else {
      acc = [ ...acc, cur ]
    }
    
    return acc
  }, [])
  
  node = cache.set(req.ip, {
    ...node,
    boards: [ ...node.boards ]
  })

  res.status(200).send({ success: true, boards: node.boards })
})

// @route    DELETE api/v1/boards/:boardId
// @desc     Delete board by id
// @access   Public
router.delete('/:boardId', (req, res) => {
  let node = res.locals.node
  if (!node) return res.status(400).send({ success: false, error: 'please create a board' })
  
  const { boardId } = req.params
  const board = node.boards.filter((b: any) => b.id === boardId)
  if (!board.length) return res.status(400).send({ success: false, error: 'invalid board id' })

  node = cache.set(req.ip, {
    ...node,
    boards: [
      ...node.boards
    ]
  })

  res.status(200).send({ success: true, boards: node.boards })
})

export default router