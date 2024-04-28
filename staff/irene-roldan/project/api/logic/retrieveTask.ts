import { ObjectId } from 'mongoose'
import { validate, errors } from 'com'
import { User, Board } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveTask(userId: ObjectId) {
    
}

export default retrieveTask