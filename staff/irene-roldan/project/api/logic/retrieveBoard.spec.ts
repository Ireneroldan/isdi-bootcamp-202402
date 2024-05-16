import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'
import logic from './index.ts'
import { User, Board } from '../data/index.ts'

dotenv.config()

const { NotFoundError } = errors

describe('retrieveBoards', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URL)
    })

    it('retrieves all boards for existing user', async () => {
        await Promise.all([
            User.deleteMany(),
            Board.deleteMany()
        ])

        const user = await User.create({ name: 'Isdi', surname: 'Coders', email: 'isdi@coders.com', password: '123qwe123' })

        const board1 = await Board.create({ author: user.id, text: 'hello board 1', date: new Date() })
        const board2 = await Board.create({ author: user.id, text: 'hello board 2', date: new Date() })
        const board3 = await Board.create({ author: user.id, text: 'hello board 3', date: new Date() })

        const boards = await logic.retrieveBoard(user.id)

        expect(boards).to.have.lengthOf(3)

        const board1b = boards.find(board => board.id.toString() === board1.id.toString())
        expect(board1b.text).to.equal(board1.text)

        const board2b = boards.find(board => board.id.toString() === board2.id.toString())
        expect(board2b.text).to.equal(board2.text)

        const board3b = boards.find(board => board.id.toString() === board3.id.toString())
        expect(board3b.text).to.equal(board3.text)
    })

    it('throws an error if user does not exist', async () => {
        const nonExistentUserId = '6123456789abcdef01234567'

        try {
            await logic.retrieveBoard(nonExistentUserId)
            expect.fail('Expected retrieveBoard to throw NotFoundError')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message.toLowerCase()).to.equal('user not found')
        }
    })



    after(async () => {
        await mongoose.disconnect()
    })
})
