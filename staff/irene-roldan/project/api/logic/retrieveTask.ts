import { ObjectId } from 'mongoose'
import { errors } from 'com'
import { User, Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveTask(userId: ObjectId, boardId: ObjectId) {
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found');
            }

            return Task.find({ "author": userId, "assignedBoard": boardId }) 
                .populate('author', '_id email')
                .lean()
                .catch(error => { throw new SystemError(error.message); })
                .then(tasks => {
                    return tasks.map(({ description, title, _id }) => ({ 
                        title,
                        description,
                        _id
                    })).reverse()
                });
        });
}

export default retrieveTask
