import { Types } from 'mongoose'
import { User } from '../data/index.ts'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function retrieveUsers(userId: Types.ObjectId): Promise<Array<{ _id: Types.ObjectId; email: string }>> {
    return User.find({ _id: { $ne: userId } }, '_id email') 
        .lean()
        .then(users => users.map(user => ({ _id: user._id, email: user.email })))
        .catch(error => { 
            throw new SystemError(error.message)
        })
}
export default retrieveUsers