import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/index.ts'
import logic from './index.ts'
import { errors } from 'com'

dotenv.config()

const { SystemError } = errors

describe('retrieveUsers', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('should return an array of users', async () => {
        await User.deleteMany()
    
        const user1 = await User.create({ name: 'John', surname: 'Doe', email: 'email1@example.com', password: 'password' })
        const user2 = await User.create({ name: 'Jane', surname: 'Smith', email: 'email2@example.com', password: 'password' })
    
        const users = await logic.retrieveUsers(user1.id.toString())
    
        expect(users).to.be.an('array')
        expect(users.length).to.equal(1)
        expect(users[0]).to.have.property('id').to.equal(user2.id.toString())
        expect(users[0]).to.have.property('email').to.equal(user2.email)
    })
    

    it('should throw SystemError if database operation fails', async () => {
        const userId = new mongoose.Types.ObjectId().toString()

        try {
            await logic.retrieveUsers(userId)
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
        }
    })

    after(() => mongoose.disconnect())
})
