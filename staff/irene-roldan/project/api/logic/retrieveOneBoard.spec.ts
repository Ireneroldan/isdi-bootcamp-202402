import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { Board } from '../data/index.ts'
import retrieveOneBoard from './retrieveOneBoard.ts'
import { errors } from 'com'

dotenv.config()

const { NotFoundError } = errors

describe('retrieveOneBoard', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await Board.deleteMany()
    })

    it('should retrieve one board by its ID', async () => {
        const validBoard = new Board({ text: 'Test Board', date: new Date(), author: new mongoose.Types.ObjectId() })
        await validBoard.save()

        const retrievedBoard = await retrieveOneBoard(validBoard.id.toString())

        expect(retrievedBoard).to.exist
        expect(retrievedBoard.text).to.equal('Test Board')
    })

    it('should throw an error if board not found', async () => {
        const nonExistentBoardId = new mongoose.Types.ObjectId().toString();

        try {
            await retrieveOneBoard(nonExistentBoardId);
            expect.fail('Expected retrieveOneBoard to throw NotFoundError');
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError);
            expect(error.message).to.include('Board not found');
        }
    });


    after(() => mongoose.disconnect())
})
