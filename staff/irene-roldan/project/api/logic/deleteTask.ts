import { validate, errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

async function deleteTask(taskId: string) {
    try {
        const task = await Task.findById(taskId)
        if (!task) {
            throw new NotFoundError('task not found')
        }

        await Task.deleteOne({ _id: task._id })
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default deleteTask