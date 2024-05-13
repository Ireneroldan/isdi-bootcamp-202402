import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User, Board } from '../data/index.ts'
import deleteBoard from './deleteBoard.ts'
import { errors } from 'com'

dotenv.config()

const { NotFoundError, SystemError } = errors

describe('deleteBoard', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await User.deleteMany()
        await Board.deleteMany()
    })

    it('should delete a board', async () => {
        const user = await User.create({ name: 'John', surname: 'Smith', email: 'john@example.com', password: 'password' })
        const board = await Board.create({ text: 'Board Title', description: 'Board Description', date: new Date(), author: user._id })
        const boardId = board.id.toString()

        await deleteBoard(boardId)
        const deletedBoard = await Board.findById(boardId)
        
        expect(deletedBoard).to.be.null
    })

    it('should throw an error if board not found', async () => {
        const nonExistentBoardId = new mongoose.Types.ObjectId().toString()

        try {
            await deleteBoard(nonExistentBoardId)
            expect.fail('Expected deleteBoard to throw NotFoundError')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Board not found')
        }
    })

    after(() => mongoose.disconnect())
})
