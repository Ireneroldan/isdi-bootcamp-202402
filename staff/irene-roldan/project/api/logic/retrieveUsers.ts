import { Types } from 'mongoose'
import { User } from '../data/index.ts'
import { errors } from 'com'
import { ObjectId } from 'mongoose'


const { SystemError } = errors

async function retrieveUsers(userId: string): Promise<{ id: string; email: string }[]> {
    try {
        const users = await User.find({ _id: { $ne: userId } }, '_id email').lean()
        return users.map(user => ({ id: user._id.toString(), email: user.email }))
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default retrieveUsers
