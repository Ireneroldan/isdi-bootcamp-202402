import { validate, errors } from 'com'
import { Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors;

function editTaskSync(taskId: string, title: string, description: string, columnType: string) {
    try {
        const task = Task.findByIdAndUpdate(taskId, { title, description, columnType });
        if (!task) {
            throw new NotFoundError('Task not found');
        }
    } catch (error) {
        throw new SystemError(error.message);
    }
}

export default editTaskSync;
