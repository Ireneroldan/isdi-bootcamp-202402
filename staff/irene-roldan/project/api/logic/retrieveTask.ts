import { ObjectId } from 'mongoose'
import { errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveTask(boardId: string, columnType: string) {
    return Task.find({'assignedBoard': boardId, 'columnType': columnType}) 
                .lean()
                .catch(error => { throw new SystemError(error.message); })
                .then((tasks: { _id: ObjectId, title: string, description: string, columnType: string }[]) => {
    return tasks.map(({ _id, title, description, columnType }) => ({ 
        id: _id.toString(),
        title,
        description,
        columnType
        })).reverse()
    })
        
}

export default retrieveTask 