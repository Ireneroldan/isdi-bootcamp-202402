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

const board = new Schema ({ 
    author: {
        type: ObjectId,
        ref: 'Board',
        required: true
    },
    text: {
        type: String,
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


const User = model<UserType>('User', user)
const Board = model<BoardType>('Board', board)

export {
    UserType,
    User,

    BoardType,
    Board
}