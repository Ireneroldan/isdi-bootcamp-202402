import { ObjectId } from 'mongoose'
import { errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveTask(boardId: ObjectId, columnType: string) {
    return Task.find({'assignedBoard': boardId, 'columnType': columnType}) 
                .lean()
                .catch(error => { throw new SystemError(error.message); })
                .then(tasks => {
                    return tasks.map(({ description, title }) => ({ 
                        title,
                        description
                    })).reverse()
                })
        
}

export default retrieveTask
