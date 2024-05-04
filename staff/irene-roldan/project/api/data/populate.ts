import mongoose from 'mongoose'

import { User, Board, Task } from '.'


mongoose.connect('mongodb://localhost:27017/tasking')
    .then(() => User.deleteMany())
    .then(() => User.create({ name: 'Katsu', surname: 'Don', email: 'katsu@don.com', password: '123qwe123' }))
    .then(user1 => {
        const board1 = { author: user1._id, text: `Project`, date: new Date}

        return Board.create(board1)
            .then(() => {
                const board2 = {author: user1._id, text: `Project 1`, date: new Date}
                
                return Board.create(board2)
            })
            .then(() => {
                const board3 = {author: user1._id, text: `Project 2`, date: new Date}
                return Board.create(board3)
            })
    })
    
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)