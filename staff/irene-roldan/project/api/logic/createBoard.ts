import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function createBoard(userId: string, text: string): Promise<void>{
    validate.text(userId, 'userId', true)
    if(text)
        validate.text(text, 'text')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if(!user)
                throw new NotFoundError('user not found')

            return Board.create({author: user._id, text, date: new Date})

                .catch(error => {throw new SystemError(error.message)})
        })
        .then(board => { })
}
export default createBoard