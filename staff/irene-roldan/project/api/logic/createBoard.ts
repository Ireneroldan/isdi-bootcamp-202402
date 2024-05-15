import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

import mongoose from 'mongoose'

async function createBoard(userId: string, text: string): Promise<void> {
    validate.text(userId, 'userId', true)
    if (text) {
        validate.text(text, 'text')
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new NotFoundError('User not found')
        }

        const user = await User.findById(userId)

        if (!user) {
            throw new NotFoundError('User not found')
        }

        const board = new Board({ author: user._id, text, date: new Date() })
        await board.save()
    } catch (error) {
        throw new SystemError(error.message)
    }
}
export default createBoard
