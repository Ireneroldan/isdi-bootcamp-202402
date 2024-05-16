import mongoose from 'mongoose'
import { User, Board, Task } from '.'

mongoose.connect('mongodb://localhost:27017/tasking')
    .then(() => User.deleteMany())
    .then(() => {
        return User.create({ name: 'Iker', surname: 'Jimenez', email: 'iker@jimenez.com', password: '123qwe123' })
    })
    .then(user1 => {
        const board1 = { author: user1._id, text: `Viaje familiar`, date: new Date() }
        return Board.create([board1])
            .then(boards => {
                const task1 = { author: user1._id, title: 'Preparar maleta', description: 'Sacar maletas, lavar ropa, doblar ropa y meterla en la maleta', date: new Date(), columnType: 'review', assignedBoard: boards[0]._id }
                const task2 = { author: user1._id, title: 'Civitatis', description: 'Reservar tour', date: new Date(), columnType: 'todo', assignedBoard: boards[0]._id }
                const task3 = { author: user1._id, title: 'Comprar billetes', description: 'Comprar vuelos', date: new Date(), columnType: 'archived', assignedBoard: boards[0]._id }
                const task4 = { author: user1._id, title: 'Vacunas', description: 'Ir al médico a vacunarse', date: new Date(), columnType: 'todo', assignedBoard: boards[0]._id }
                const task5 = { author: user1._id, title: 'Buscar monumentos', description: 'Hacer una lista de lugares para visitar.', date: new Date(), columnType: 'doing', assignedBoard: boards[0]._id }


                return Task.create([task1, task2, task3, task4, task5])
            })
    })

    .then(() => {
        return User.create({ name: 'Katsu', surname: 'Don', email: 'katsu@don.com', password: '123qwe123' })
    })
    .then(user3 => {
        const board4 = { author: user3._id, text: `Project 1`, date: new Date() }

        return Board.create(board4)
            .then(board => {
                const task6 = { author: user3._id, title: 'Task 1', description: 'Description for Task 1: Dapibus dui nibh phasellus etiam justo cubilia aliquet enim habitant, sagittis placerat molestie tristique tellus tempus taciti dictum viverra massa, torquent quam himenaeos nec sociis euismod turpis nisi.', date: new Date(), columnType: 'todo', assignedBoard: board._id }
                const task7 = { author: user3._id, title: 'Task 2', description: 'Description for Task 2: Imperdiet nullam justo fames ut gravida in nostra dui, integer aenean aptent viverra dictum auctor fusce, non suscipit libero sem mus nisi quisque.', date: new Date(), columnType: 'doing', assignedBoard: board._id }
                const task8 = { author: user3._id, title: 'Task 3', description: 'Description for Task 3: Class aptent aliquam id porta velit euismod hendrerit, est vulputate tempus auctor vivamus sagittis, varius curabitur sodales urna fusce eleifend.', date: new Date(), columnType: 'done', assignedBoard: board._id }
                const task9 = { author: user3._id, title: 'Task 4', description: 'Description for Task 4: Class aptent aliquam id porta velit euismod hendrerit, est vulputate tempus auctor vivamus sagittis.', date: new Date(), columnType: 'review', assignedBoard: board._id }
                const task10 = { author: user3._id, title: 'Task 5', description: 'Description for Task 5: Facilisis cursus viverra dis phasellus posuere vivamus quam purus, morbi tempus a sed eros tristique metus, pretium cubilia feugiat hac inceptos hendrerit nisl.', date: new Date(), columnType: 'archived', assignedBoard: board._id }
                const task11 = { author: user3._id, title: 'Task 6', description: 'Description for Task 5: Dapibus dui nibh phasellus etiam justo cubilia aliquet enim habitant, sagittis placerat molestie tristique tellus tempus taciti dictum viverra massa,', date: new Date(), columnType: 'todo', assignedBoard: board._id }
                const task12 = { author: user3._id, title: 'Task 7', description: 'Description task 7', date: new Date(), columnType: 'todo', assignedBoard: board._id }

                return Task.create([task6, task7, task8, task9, task10, task11, task12])
            })
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)
