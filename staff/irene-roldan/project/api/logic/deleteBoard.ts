import { Board } from '../data/index.ts'
import { errors } from 'com'
import { ObjectId } from 'mongoose'

const { SystemError, NotFoundError } = errors

function deleteBoard(boardId: ObjectId) {
    return Board.findByIdAndDelete(boardId)
        .then(board => {
            if (!board) {
                throw new NotFoundError('Board not found')
            }
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}

export default deleteBoard
