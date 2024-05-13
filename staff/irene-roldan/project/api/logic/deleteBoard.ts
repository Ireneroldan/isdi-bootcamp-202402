import { Board } from '../data/index.ts'
import { errors } from 'com'
import { ObjectId } from 'mongoose'

const { NotFoundError } = errors

async function deleteBoard(boardId: string | ObjectId) {
    try {
        const deletedBoard = await Board.findByIdAndDelete(boardId)

        if (!deletedBoard) {
            throw new NotFoundError('Board not found')
        }
    } catch (error) {
        throw new NotFoundError('Board not found')
    }
}

export default deleteBoard
