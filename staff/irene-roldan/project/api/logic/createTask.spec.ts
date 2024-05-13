import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User, Board, Task } from '../data/index.ts'
import createTask from './createTask.ts'
import { errors } from 'com'

dotenv.config()

const { NotFoundError, SystemError } = errors

describe('createTask', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    beforeEach(async () => {
        await User.deleteMany()
        await Board.deleteMany()
        await Task.deleteMany()
    })

    it('should create a new task associated with a board', async () => {
        const user = await User.create({ name: 'John', surname: 'smith', email: 'john@example.com', password: 'password' })

        const board = await Board.create({ 
            text: 'Test Board', 
            description: 'Board Description', 
            date: new Date(),  
            author: new mongoose.Types.ObjectId(user._id)  
        })
        const boardId = board.id.toString()

        const taskTitle = 'Task Title'
        const taskDescription = 'Task Description'
        const columnType = 'todo' 
        const userId = user._id.toString() 

        await createTask(userId, taskTitle, taskDescription, boardId, columnType)

        const createdTask = await Task.findOne({ title: taskTitle })

        expect(createdTask).to.exist
        expect(createdTask!.title).to.equal(taskTitle)
        expect(createdTask!.description).to.equal(taskDescription)
        expect(createdTask!.columnType).to.equal(columnType)
    })
    

    it('should throw an error if board not found', async () => {
        const user = await User.create({ name: 'John', surname: 'smith', email: 'john@example.com', password: 'password' })
        const userId = user.id.toString()

        const boardId = new mongoose.Types.ObjectId().toString()

        try {
            await createTask(userId, 'Task Title', 'Task Description', boardId, 'columnType')

            expect.fail('Expected createTask to throw NotFoundError')
        } catch (error) {
            expect(error.message).to.equal('Board not found')
        }
    })

    it('should create a new task', async () => {
        const user = await User.create({ name: 'John', surname: 'smith', email: 'john@smith.com', password: 'password' })
        const userId = user.id.toString()

        const board = await Board.create({ text: 'Board Title', description: 'Board Description', date: new Date(), author: user._id })
        const boardId = board.id.toString()

        await createTask(userId, 'Task Title', 'Task Description', boardId, 'todo') // Asegúrate de que 'todo' sea un valor válido para columnType

        const task = await Task.findOne({ title: 'Task Title' })

        expect(task).to.exist
        expect(task!.title).to.equal('Task Title')
        expect(task!.description).to.equal('Task Description')
        expect(task!.author.toString()).to.equal(userId)
    })

    after(() => mongoose.disconnect())
})
