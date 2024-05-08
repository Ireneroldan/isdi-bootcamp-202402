import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'
import logic from './index.ts'
import { User, Board } from '../data/index.ts'
import Types from 'mongoose'

dotenv.config()

const { CredentialsError, NotFoundError } = errors
const userId = new mongoose.Types.ObjectId()

describe('retrieveUsers', () => {
    describe('retrieveUsers', () => {
        it('return an array of users', async () => {
            const userId = new mongoose.Types.ObjectId()
            const user = new User({ _id: userId, email: 'email', password: 'password' })
            await user.save()
            const users = await logic.retrieveUsers(userId)
            expect(users).to.be.an('array')
        })
    })
    after(() => mongoose.disconnect())
})

