import express from 'express'
import {
    deleteTaskHandler,
    editTaskHandler,
    retrieveTaskHandler,
    createTaskHandler
} from './handlers/index.ts'
const { json } = express
const jsonBodyParser = json()
const router = express.Router()

router.delete('/tasks/:taskId', deleteTaskHandler)
router.put('/tasks/:taskId', jsonBodyParser, editTaskHandler)
router.get('/boards/:boardId/tasks/:columnType', retrieveTaskHandler)
router.post('/boards/:boardId/tasks', jsonBodyParser, createTaskHandler)

export default router
