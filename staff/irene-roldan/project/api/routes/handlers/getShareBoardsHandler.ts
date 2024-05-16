import logic from '../../logic/index.ts'
import { errors } from 'com'
import jwt from 'jsonwebtoken'
import logger from '../../data/logger.ts'

const {
    SystemError,
    NotFoundError,
    CredentialsError
} = errors

export default async (req, res) => {
    try {
        const { authorization } = req.headers
        const { JWT_SECRET } = process.env
        const token = authorization.slice(7)
        const { sub: userId } = jwt.verify(token, JWT_SECRET)
        const sharedBoards = await logic.getShareBoards(userId)

        res.status(200).json(sharedBoards)
    } catch (error) {
        if (error instanceof SystemError) {
            logger.error(error.message)
            res.status(500).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof NotFoundError) {
            logger.warn(error.message)
            res.status(404).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof CredentialsError) {
            logger.warn(error.message)
            res.status(401).json({ error: error.constructor.name, message: error.message })
        } else {
            logger.error(error.message)
            res.status(500).json({ error: 'Internal Server Error', message: 'An internal error has occurred.' })
        }
    }
}
