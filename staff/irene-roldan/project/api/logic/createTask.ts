import { validate, errors } from 'com'
import { User, Board, Task } from '../data/index.ts'
import { ObjectId } from 'mongoose'

const { SystemError, NotFoundError } = errors

async function createTask(userId: string, title: string, description: string, boardId: string): Promise<void> {
    try {
        validate.text(userId, 'userId', true)
        validate.text(title, 'title')
        validate.text(description, 'description')
        validate.text(boardId, 'boardId')

        const user = await User.findById(userId)
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const board = await Board.findById(boardId)
        if (!board) {
            throw new NotFoundError('Board not found')
        }

        await Task.create({
            author: user._id,
            title,
            description,
            date: new Date(),
            assignedBoard: boardId
        })
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default createTask
