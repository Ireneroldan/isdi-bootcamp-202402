import logic from '../../logic/index.ts'
import { errors } from 'com'
import jwt from 'jsonwebtoken'
import logger from '../../data/logger.ts'

const {
    ContentError,
    SystemError,
    NotFoundError,
    UnauthorizedError
} = errors

export default async (req, res) => {
    try {
        const { authorization } = req.headers
        const { JWT_SECRET } = process.env

        if (!authorization) {
            throw new UnauthorizedError('Missing authorization header')
        }
        
        const token = authorization.slice(7)
        const { sub: userId } = jwt.verify(token, JWT_SECRET)
        //@ts-ignore
        const boards = await logic.retrieveBoard(userId as ObjectId)

        res.json(boards)
    } catch (error) {
        if (error instanceof ContentError || error instanceof TypeError) {
            logger.warn(error.message)
            res.status(406).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof UnauthorizedError) {
            logger.warn(error.message)
            res.status(401).json({ error: UnauthorizedError.name, message: error.message })
        } else if (error instanceof NotFoundError) {
            logger.warn(error.message)
            res.status(404).json({ error: NotFoundError.name, message: error.message })
        } else {
            logger.error(error.message)
            res.status(500).json({ error: SystemError.name, message: 'Internal server error' })
        }
    }
}
