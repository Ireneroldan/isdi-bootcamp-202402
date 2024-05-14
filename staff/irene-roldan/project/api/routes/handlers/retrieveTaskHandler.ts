import logic from '../../logic/index.ts'
import { errors } from 'com'
import jwt from 'jsonwebtoken'
import logger from '../../data/logger.ts'

const { TokenExpiredError } = jwt

const {
    ContentError,
    SystemError,
    NotFoundError,
    UnauthorizedError
} = errors

export default async (req, res) => {
    try {
        const { boardId, columnType } = req.params

        const tasks = await logic.retrieveTask(boardId, columnType)

        res.json(tasks)
    } catch (error) {
        if (error instanceof SystemError) {
            logger.error('Error retrieving tasks:', error)
            res.status(500).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof NotFoundError) {
            logger.warn('No tasks found for the board:', error)
            res.status(404).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof ContentError || error instanceof TypeError) {
            logger.warn('Type error:', error)
            res.status(406).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof TokenExpiredError) {
            logger.warn('Expired token:', error)
            res.status(498).json({ error: UnauthorizedError.name, message: 'Session expired' })
        } else {
            logger.error('Unknown error:', error)
            res.status(500).json({ error: SystemError.name, message: 'Internal Server Error' })
        }
    }
}
