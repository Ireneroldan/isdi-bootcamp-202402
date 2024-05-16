import { errors } from 'com'
import { Task } from '../data/index.ts'
import { ObjectId } from 'mongoose';

const { SystemError, NotFoundError } = errors

async function editTask(taskId: ObjectId, title: string, description: string, columnType: string) {
    
    
    try {
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
