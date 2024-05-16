import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    surname: string
    email: string
    password: string
}


const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

type BoardType = {
    author: ObjectId
    text: string
    date: Date
    assignedUsers: ObjectId[]
}

const board = new Schema({
    author: {
        type: ObjectId,
        ref: 'Board',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    assignedUsers: [{
        type: ObjectId,
        ref: 'User',
        required: false
    }]
})

type TaskType = {
    author: ObjectId
    title: string
    description: string
    date: Date
    columnType: string
    assignedUsers: ObjectId[]
}

const task = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    columnType: {
        type: String,
        enum: ['todo', 'doing', 'review', 'done', 'archived'],
        required: true
    },
    assignedBoard: {
        type: ObjectId,
        ref: 'Board',
        required: true
    },
    assignedUsers: [{
        type: ObjectId,
        ref: 'User'
    }]
})

const User = model<UserType>('User', user)
const Board = model<BoardType>('Board', board)
const Task = model<TaskType>('Task', task)

export {
    UserType,
    User,

    BoardType,
    Board,

    TaskType,
    Task
}