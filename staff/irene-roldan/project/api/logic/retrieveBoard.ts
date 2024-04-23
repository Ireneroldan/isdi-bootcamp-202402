import { ObjectId } from 'mongoose'
import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'
const { SystemError, NotFoundError } = errors

function retrieveBoard (userId): Promise<[{ id: string, author: { id: string, email: string }, text: string, date: Date }] | { id: string; author: { id: string; username: string; }; text: string; date: Date; }[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if(!user)
                throw new NotFoundError('user not found')

            return Board.find().populate<{author: { _id: ObjectId, email: string}}>('author', 'email').lean()
                .catch(error => { throw new SystemError(error.message)})
                .then(boards => 
                    boards.map<{id: string, author: { id: string, email: string }, text: string, date: Date}>(({ _id, author, text, date }) => ({
                        id: _id.toString(),
                        author: {
                            id: author._id.toString(),
                            email: author.email
                        },
                        text,
                        date
                    })).reverse()
                    
                )
        })
}

export default retrieveBoard