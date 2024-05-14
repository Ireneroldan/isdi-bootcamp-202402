import logic from '../../logic/index.ts'
import { errors } from 'com'
import logger from '../../data/logger.ts'

const { SystemError } = errors

export default async (req, res) => {
    try {
        const { taskId } = req.params
        await logic.deleteTask(taskId) 
        res.status(204).json({ message: 'La tarea fue eliminada exitosamente' })
    } catch (error) {
        if (error instanceof SystemError) {
            logger.error('Error eliminando la tarea:', error)
            res.status(500).json({ error: 'SystemError', message: error.message })
        } else {
            logger.error('Error eliminando la tarea:', error)
            res.status(500).json({ error: 'SystemError', message: 'Error interno del servidor' })
        }
    }
}
