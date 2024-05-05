import { ObjectId } from 'mongoose'
import { errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveTask(boardId: string, columnType: string) {
    return Task.find({'assignedBoard': boardId, 'columnType': columnType}) 
                .lean()
                .catch(error => { throw new SystemError(error.message); })
                .then(tasks => {
                    return tasks.map(({ _id, description, title }) => ({ 
                        id: _id,
                        title,
                        description
                    })).reverse()
                })
        
}

export default retrieveTask 
