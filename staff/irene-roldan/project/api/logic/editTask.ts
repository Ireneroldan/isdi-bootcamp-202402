import { validate, errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

async function editTask(taskId: string, title: string, description: string, columnType: string) {
    
    try {
        console.log('entra')
        const task = await Task.findById(taskId)
        if (!task) {
            throw new NotFoundError('Task not found')
        }

        task.title = title
        task.description = description
        task.columnType = columnType
        await task.save() 

        return task
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default editTask
