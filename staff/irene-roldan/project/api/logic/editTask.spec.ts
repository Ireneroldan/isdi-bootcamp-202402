import { expect } from 'chai'
import { errors } from 'com'
import { Task } from '../data/index.ts'
import mongoose from 'mongoose'
import editTask from './editTask.ts'

const { SystemError, NotFoundError } = errors

describe('editTask', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await Task.deleteMany({})
    })
    
    it('should edit a task', async () => {
        const task = new Task({
            title: 'Task 1',
            description: 'Description 1',
            columnType: 'todo',
            assignedBoard: new mongoose.Types.ObjectId(),
            author: new mongoose.Types.ObjectId() 
        })

        await task.save()

        const editedTask = await editTask(task.id, 'Task 2', 'Description 2', 'doing')

        expect(editedTask.title).to.equal('Task 2')
        expect(editedTask.description).to.equal('Description 2')
        expect(editedTask.columnType).to.equal('doing')
    })
    after(() => mongoose.disconnect())
})
