import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User, Board } from '../data/index.ts'
import createBoard from './createBoard.ts'
import { errors } from 'com'

dotenv.config()

const { SystemError } = errors

describe('createBoard', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await User.deleteMany()
        await Board.deleteMany()
    })

    it('should create a new board with valid user and text', async () => {
        const user = await User.create({ name: 'John', surname:'smith' ,email: 'john@example.com', password: 'password' })
        const userId = user.id.toString()

        await createBoard(userId, 'Board Text')

        const board = await Board.findOne({ text: 'Board Text' })
        expect(board).to.exist
        expect(board!.author.toString()).to.equal(userId)
    })

    it('should throw an error if user not found', async () => {
        const userId = 'nonexistentUserID'
    
        try {
            await createBoard(userId, 'Board Text')
            expect.fail('Expected createBoard to throw NotFoundError')
        } catch (error) {
            expect(error.message).to.include('User not found')
        }
    })
    

    it('should throw an error if text is empty', async () => {
        const user = await User.create({ name: 'John', surname:'smith', email: 'john@example.com', password: 'password' })
        const userId = user.id.toString()

        try {
            await createBoard(userId, '')
            expect.fail('Expected createBoard to throw SystemError')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
        }
    })

    after(() => mongoose.disconnect())
})
