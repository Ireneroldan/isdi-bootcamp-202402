import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Task } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors


describe('deleteTask', function() {
    it('delete a task successfully', function(done) {
        const title = 'Test Task';
        const description = 'Test Description'
        const columnType = 'Test Column'

        Task.create(title, description, columnType)
            .then(task => {
                try {
                    logic.deleteTask(task._id)
                        .then(() => {
                            Task.findById(task._id)
                                .then(task => {
                                    expect(task).to.be.null
                                    done()
                                })
                                .catch(done)
                        })
                        .catch(done)
                } catch (error) {
                    done(error)
                }
            })
            .catch(done)
    })
    after(() => mongoose.disconnect())
})