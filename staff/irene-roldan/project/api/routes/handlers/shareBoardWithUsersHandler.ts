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
        const { userId, boardId } = req.body

        await logic.shareBoardWithUsers(boardId, userId)

        res.status(201).send()
    } catch (error) {
        if (error instanceof ContentError || error instanceof TypeError) {
            logger.warn(error.message)
            res.status(406).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof TokenExpiredError) {
            logger.warn(error.message)
            res.status(498).json({ error: UnauthorizedError.name, message: 'Session expired' })
        } else if (error instanceof UnauthorizedError) {
            logger.warn(error.message)
            res.status(401).json({ error: UnauthorizedError.name, message: error.message })
        } else if (error instanceof NotFoundError) {
            logger.warn(error.message)
            res.status(404).json({ error: NotFoundError.name, message: error.message })
        } else if (error instanceof SystemError) {
            logger.error(error.message)
            res.status(500).json({ error: SystemError.name, message: error.message })
        } else {
            logger.error('Error compartiendo el tablero:', error)
            res.status(500).json({ error: SystemError.name, message: 'Error interno del servidor' })
        }
    }
}
