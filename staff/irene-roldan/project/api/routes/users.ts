import express from 'express'
import {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrieveUsersHandler
} from './handlers/index.ts'
const { json } = express

const jsonBodyParser = json()

const router = express.Router()

router.post('/', jsonBodyParser, registerUserHandler)
router.post('/auth', jsonBodyParser, authenticateUserHandler)
router.get('/:targetUserId', retrieveUserHandler)
router.get('/', retrieveUsersHandler)

export default router
