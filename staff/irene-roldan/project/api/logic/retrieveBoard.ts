import { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBoards(userId): Promise<[{ id: string, author: { id: string, email: string }, text: string}] | { id: string; author: { id: string; email: string; }; text: string; }[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
    if (!user)
      throw new NotFoundError('user not found');

    return Board.find({ "author" : userId })
      .populate<{ author: { _id: ObjectId, email: string } }>('author', 'email')
      .lean()
      .catch(error => { throw new SystemError(error.message) })
      .then(boards =>
        boards.map<{ text: string }>(({ text }) => ({
        text
        })).reverse()
      )  
    })

}

export default retrieveBoards