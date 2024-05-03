import { Task } from '../data/index.ts'
import { errors } from 'com'
import { ObjectId } from 'mongoose';


const { SystemError, NotFoundError } = errors

function deleteTask(taskId: ObjectId) {
    return Task.findByIdAndDelete(taskId)
        .then(task => {
            if (!task) {
                throw new NotFoundError('Task not found');
            }
        })
        .catch(error => {
            throw new SystemError(error.message);
        });
}

export default deleteTask