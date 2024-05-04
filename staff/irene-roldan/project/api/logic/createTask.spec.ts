import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Task } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors


describe('createTask', function() {
    it('should create a new task with the provided title, description, and columnType', function(done) {
        const title = 'Test Task';
        const description = 'Test Description'
        const columnType = 'Test Column'

        Task.create(title, description, columnType)
            .then(task => {
                try {
                    expect(task).to.be.a('object')
                    expect(task).to.have.property('title', title)
                    expect(task).to.have.property('description', description)
                    expect(task).to.have.property('columnType', columnType)
                    done()
                } catch (error) {
                    done(error)
                }
            })
            .catch(done)
    })
    after(() => mongoose.disconnect())
})