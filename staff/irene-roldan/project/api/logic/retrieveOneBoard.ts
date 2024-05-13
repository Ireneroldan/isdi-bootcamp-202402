import { validate, errors } from 'com'
import { Board } from '../data/index.ts'

const { NotFoundError } = errors

async function retrieveOneBoard(boardId: string): Promise<{ text: string }> {
    validate.text(boardId, 'boardId', true)

    const board = await Board.findById(boardId).select('text').lean()

    if (!board) {
        throw new NotFoundError('Board not found')
    }

    return { text: board.text }
}

export default retrieveOneBoard
