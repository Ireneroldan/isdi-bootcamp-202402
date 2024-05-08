import { ObjectId } from 'mongoose'
import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBoards(userId: ObjectId): Promise<{ id: string; author: { id: string; email: string }; text: string }[]> {
    validate.text(userId, 'userId', true)
    
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found');

            return Board.find({ "author" : userId })
                .populate<{ author: { _id: ObjectId; email: string}}>('author', 'email')
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(boards =>
                    boards.map<{id: string, text: string, assignedUsers: ObjectId[]}>(({ _id, text, assignedUsers}) => ({
                        text,
                        id: _id.toString(),
                        assignedUsers
                    })).reverse()
                ) as Promise<{ id: ObjectId; author: { _id: ObjectId; email: string }; text: string }[]>
        })
}

export default retrieveBoards
