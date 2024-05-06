import { ObjectId } from 'mongoose'
import { errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveTask(boardId: string, columnType: string) {
    return Task.find({'assignedBoard': boardId, 'columnType': columnType}) 
                .lean()
                .catch(error => { throw new SystemError(error.message); })
                .then(tasks => {
                    return tasks.map(({ _id, description, title, columnType}) => ({ 
                        id: _id,
                        title,
                        description,
                        columnType
                    })).reverse()
                })
        
}

export default retrieveTask 
