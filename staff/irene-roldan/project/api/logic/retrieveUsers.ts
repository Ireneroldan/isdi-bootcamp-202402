import { ObjectId } from 'mongoose'
import { User } from '../data/index'
import { Schema } from 'mongoose'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors
const { Types: { ObjectId } } = Schema

function retrieveUsers(): Promise<{ _id: ObjectId; email: string }> {
    return User.find({}, '_id email') 
        .lean()
        .catch(error => { 
            throw new SystemError(error.message)
        });
}

export default retrieveUsers
