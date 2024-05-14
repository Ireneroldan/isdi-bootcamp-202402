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
    const { authorization } = req.headers
    const { JWT_SECRET } = process.env
    const token = authorization.slice(7)

    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    try {
        //@ts-ignore
        const users = await logic.retrieveUsers(userId)
        res.json(users)
    } catch (error) {
        if (error instanceof SystemError) {
            logger.error(error.message)
            res.status(500).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof NotFoundError) {
            logger.warn(error.message)
            res.status(404).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof TypeError || error instanceof ContentError) {
            logger.warn(error.message)
            res.status(406).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof TokenExpiredError) {
            logger.warn(error.message)
            res.status(498).json({ error: UnauthorizedError.name, message: 'Session expired' })
        } else {
            logger.warn(error.message)
            res.status(500).json({ error: SystemError.name, message: error.message })
        }
    }
}
