/*import express from 'express'
import {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrieveUsersHandler,

    createBoardHandler,
    retrieveOneBoardHandler,
    retrieveBoardHandler,
    deleteBoardHandler,
    shareBoardWithUsersHandler,
    getShareBoardsHandler,

    createTaskHandler,
    editTaskHandler,
    deleteTaskHandler,
    retrieveTaskHandler
} from './handlers/index.ts'

const { Router, json } = express

//const api = express()

const users = Router()
const tasks = Router()
const boards = Router()

const jsonBodyParser = json()

users.post('/', jsonBodyParser, registerUserHandler)
users.post('/auth', jsonBodyParser, authenticateUserHandler)
users.get('/:targetUserId', retrieveUserHandler)
users.get('/', retrieveUsersHandler)

boards.post('/', jsonBodyParser, createBoardHandler)
boards.get('/', retrieveBoardHandler)
boards.get('/id/:boardId', retrieveOneBoardHandler)
boards.delete('/:boardId', deleteBoardHandler)
boards.post('/shared', jsonBodyParser, shareBoardWithUsersHandler)
boards.get('/shared', getShareBoardsHandler)

tasks.delete('/:taskId', deleteTaskHandler)
tasks.put('/:taskId', jsonBodyParser, editTaskHandler)
boards.get('/:boardId/tasks/:columnType', retrieveTaskHandler)
tasks.post('/:boardId/tasks', jsonBodyParser, createTaskHandler)

export {
    users,
    tasks,
    boards
}*/