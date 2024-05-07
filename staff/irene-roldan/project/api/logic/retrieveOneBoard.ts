import { ObjectId } from 'mongoose'
import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveOneBoard(boardId: string): Promise<{ text: string }> {
    validate.text(boardId, 'boardId', true)
    //@ts-ignore

    return Board.findById(boardId)
        .select('text')
        .lean()
        .then((board: any) => {
            if (!board) {
                throw new NotFoundError(`Board with id ${boardId} not found`);
            }
            return [board.text] 
        })
        .catch(error => { throw new SystemError(error.message); });
}
export default retrieveOneBoard