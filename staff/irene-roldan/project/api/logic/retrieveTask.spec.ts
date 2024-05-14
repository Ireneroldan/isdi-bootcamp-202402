import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Task } from '../data/index.ts'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()
const { NotFoundError } = errors

describe('retrieveTask', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds on retrieving tasks for existing board and column type', () => {
        const boardId = new mongoose.Types.ObjectId()
        const columnType = 'todo'

        return Task.deleteMany()
            .then(() => Task.create([
                { assignedBoard: boardId, columnType, title: 'Task 1', description: 'Description 1', author: new mongoose.Types.ObjectId() },
                { assignedBoard: boardId, columnType, title: 'Task 2', description: 'Description 2', author: new mongoose.Types.ObjectId() }
            ]))
            .then(() => logic.retrieveTask(boardId.toString(), columnType))
            .then(tasks => {
                expect(tasks).to.be.an('array')
                expect(tasks).to.have.lengthOf(2)
            })
    })

    it('fails on retrieving tasks for non-existing board', () => {
        const boardId = new mongoose.Types.ObjectId()
        const columnType = 'todo'

        return Task.deleteMany()
            .then(() => logic.retrieveTask(boardId.toString(), columnType))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('board not found')
            })
    })

    after(() => mongoose.disconnect())
})
