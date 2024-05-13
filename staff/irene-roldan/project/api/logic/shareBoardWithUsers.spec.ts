import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User, Board } from '../data/index.ts'
import shareBoardWithUsers from './shareBoardWithUsers.ts'
import { errors } from 'com'

dotenv.config()

const { NotFoundError } = errors

describe('shareBoardWithUsers', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await User.deleteMany()
        await Board.deleteMany()
    })

    it('should share a board with a user', async () => {
        const user = await User.create({ name: 'John', surname: 'Smith', email: 'john@example.com', password: 'password' })
        const board = await Board.create({ text: 'Test Board', date: new Date(), author: user._id })
        const boardId = board.id.toString()
        const userId = user.id.toString()

        await shareBoardWithUsers(boardId, userId)

        const updatedBoard = await Board.findById(boardId)
        expect(updatedBoard).to.exist
        expect(updatedBoard!.assignedUsers).to.include(userId)
    })

    it('should throw an error if user not found', async () => {
        const user = await User.create({ name: 'John', surname: 'Smith', email: 'john@example.com', password: 'password' })
        const board = await Board.create({ text: 'Test Board', date: new Date(), author: user._id })
        const boardId = board.id.toString()
        const nonExistentUserId = new mongoose.Types.ObjectId().toString()

        try {
            await shareBoardWithUsers(boardId, nonExistentUserId)
            expect.fail('Expected shareBoardWithUsers to throw NotFoundError')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })
    after(() => mongoose.disconnect())
})
