import { Types } from 'mongoose'
import { User } from '../data/index.ts'
import { errors } from 'com'

const { SystemError } = errors

function retrieveUsers(userId: string): Promise<Array<{ _id: Types.ObjectId; email: string }>> {
    return User.find({ _id: { $ne: userId } }, '_id email') 
        .lean()
        .then(users => users.map(user => ({ _id: user._id, email: user.email })))
        .catch(error => { 
            throw new SystemError(error.message)
        })
}
export default retrieveUsers