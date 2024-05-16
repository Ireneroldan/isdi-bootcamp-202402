import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { NotFoundError } = errors

function shareBoardWithUsers(boardId, userId) {
    validate.text(userId, 'userId', true)
    validate.text(boardId, 'boardId', true)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('User not found')

        const board = await Board.findById(boardId)
        if (!board) throw new NotFoundError('Board not found')

        board.assignedUsers.push(userId)

        await board.save()
    })()
}
export default shareBoardWithUsers
