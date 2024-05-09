import mongoose from 'mongoose'
import { User, Board, Task } from '.'

mongoose.connect('mongodb://localhost:27017/tasking')
    .then(() => User.deleteMany())
    .then(() => {
        return User.create({ name: 'Katsu', surname: 'Don', email: 'katsu@don.com', password: '123qwe123' })
    })
    .then(user1 => {
        const board1 = { author: user1._id, text: `Project 1`, date: new Date() }
        const board2 = { author: user1._id, text: `Project 2`, date: new Date() }

        return Board.create([board1, board2])
            .then(boards => {
                const task1 = { author: user1._id, title: 'Task 1', description: 'Description for Task 1', date: new Date(), columnType: 'todo', assignedBoard: boards[0]._id }
                const task2 = { author: user1._id, title: 'Task 2', description: 'Description for Task 2', date: new Date(), columnType: 'doing', assignedBoard: boards[0]._id }
                const task3 = { author: user1._id, title: 'Task 3', description: 'Description for Task 3', date: new Date(), columnType: 'todo', assignedBoard: boards[1]._id }

                return Task.create([task1, task2, task3])
            })
    })
    .then(() => {
        return User.create({ name: 'Iker', surname: 'Jimenez', email: 'iker@jimenez.com', password: '123qwe123' })
    })
    .then(user2 => {
        const board3 = { author: user2._id, text: `Project 3`, date: new Date() }

        return Board.create(board3)
            .then(board => {
                const task4 = { author: user2._id, title: 'Task 4', description: 'Description for Task 4', date: new Date(), columnType: 'todo', assignedBoard: board._id }
                const task5 = { author: user2._id, title: 'Task 5', description: 'Description for Task 5', date: new Date(), columnType: 'doing', assignedBoard: board._id }

                return Task.create([task4, task5])
            })
    })
    .then(() => {
        return User.create({ name: 'Ana', surname: 'Banana', email: 'ana@banana.com', password: '123qwe123' })
    })
    .then(user3 => {
        const board4 = { author: user3._id, text: `Project 4`, date: new Date() }

        return Board.create(board4)
            .then(board => {
                const task6 = { author: user3._id, title: 'Task 6', description: 'Description for Task 6', date: new Date(), columnType: 'todo', assignedBoard: board._id }
                const task7 = { author: user3._id, title: 'Task 7', description: 'Description for Task 7', date: new Date(), columnType: 'doing', assignedBoard: board._id }
                const task8 = { author: user3._id, title: 'Task 8', description: 'Description for Task 8', date: new Date(), columnType: 'done', assignedBoard: board._id }

                return Task.create([task6, task7, task8])
            })
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)
