import logic from '../../logic/index.ts'
import { errors } from 'com'
import logger from '../../data/logger.ts'

const {
    SystemError,
    NotFoundError
} = errors

export default async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { title, description, columnType } = req.body

        const updatedTask = await logic.editTask(taskId, title, description, columnType)

        if (!updatedTask) {
            return res.status(404).json({ error: NotFoundError.name, message: 'Task not found' })
        }

        res.status(200).json(updatedTask)
    } catch (error) {
        logger.error('Error editing task:', error)
        res.status(500).json({ error: SystemError.name, message: 'Internal Server Error' })
    }
}
