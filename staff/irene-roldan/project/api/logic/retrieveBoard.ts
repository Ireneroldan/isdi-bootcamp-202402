import { ObjectId } from 'mongoose'
import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBoards(userId: ObjectId): Promise<{ id: ObjectId; author: { _id: ObjectId; email: string }; text: string }[]> {
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
                    boards.map(({ text, _id, assignedUsers}) => ({
                        text,
                        _id,
                        assignedUsers
                    })).reverse()
                ) as Promise<{ id: ObjectId; author: { _id: ObjectId; email: string }; text: string }[]>
        })
}

export default retrieveBoards
