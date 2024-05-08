import dotenv from 'dotenv'
import chaiAsPromised from 'chai-as-promised'
import mongoose from 'mongoose'
import { Board, User, Task } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors


describe('createTask', function() {
    it('should throw an error if user not found', async function() {
        const userId = new mongoose.Types.ObjectId().toString()
        const title = 'Test title'
        const description = 'Test description'
        const boardId = 'Test boardId'
        const columnType = 'Test columnType'

        await expect(logic.createTask(userId, title, description, boardId, columnType)).to.be.rejectedWith('User not found')
    })

    it('should throw an error if board not found', async function() {
        const user = new User({ email: 'test@test.com', password: 'test' })
        await user.save()

        const userId = user.id
        const title = 'Test title'
        const description = 'Test description'
        const boardId = new mongoose.Types.ObjectId().toString()
        const columnType = 'Test columnType'

        await expect(logic.createTask(userId, title, description, boardId, columnType)).to.be.rejectedWith('Board not found')
    })

    it('should create a new task', async function() {
        const user = new User({ email: 'test@test.com', password: 'test' })
        await user.save()

        const board = new Board({ name: 'Test board', owner: user._id })
        await board.save()

        const userId = user._id.toString()
        const title = 'Test title'
        const description = 'Test description'
        const boardId = board._id.toString()
        const columnType = 'Test columnType'

        await logic.createTask(userId, title, description, boardId, columnType)

        const task = await Task.findOne({ author: user._id, assignedBoard: board._id })
        expect(task).to.exist
        expect(task.title).to.equal(title)
        expect(task.description).to.equal(description)
        expect(task.columnType).to.equal(columnType)
    })
})