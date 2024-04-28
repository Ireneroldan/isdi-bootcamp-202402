import { validate, errors } from 'com'
import { User, Board, Task } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function createTask(userId: string, title: string, description: string, boardId: string): Promise<void>{
    validate.text(userId, 'userId', true)
    if (title)
        validate.text(title, 'title')
    validate.text(description, 'description')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Board.findById(boardId)
                .then(board => {
                    if (!board)
                        throw new NotFoundError('board not found')

                    if (!boardId) {
                        throw new SystemError('boardId is undefined')
                    }
                    return Task.create({ author: user._id, title, description, date: new Date(), assignedBoard: boardId })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default createTask
