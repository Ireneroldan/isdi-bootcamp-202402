import { ObjectId } from 'mongoose'
import { errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError } = errors

function retrieveTask(boardId, columnType) {
    return Task.find({ assignedBoard: boardId, columnType }) 
        .populate('assignedBoard', 'title description columnType')
        .lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(tasks => {
            return tasks.map(({ _id, title, description, columnType }) => ({ 
                id: _id.toString(),
                title,
                description,
                columnType
            })).reverse()
        })
}

export default retrieveTask
