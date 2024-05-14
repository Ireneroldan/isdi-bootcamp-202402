import logic from '../../logic/index.ts'
import { errors } from 'com'
import logger from '../../data/logger.ts'

const {
    SystemError,
} = errors

export default async (req, res) => {
    try {
        const { boardId } = req.params
        await logic.deleteBoard(boardId) 
        res.status(204).json({ message: 'The board was successfully deleted' })
    } catch (error) {
        if (error instanceof SystemError) {
            logger.error(error.message)
            res.status(500).json({ error: error.constructor.name, message: error.message })
        } else {
            logger.error('Error eliminando el tablero:', error)
            res.status(500).json({ error: SystemError.name, message: 'Internal Server Error' })
        }
    }
}
