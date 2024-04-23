import mongoose from 'mongoose'

import { User } from '.'


mongoose.connect('mongodb://localhost:27017/tasking')
    .then(() => User.deleteMany())
    .then(() => User.create({ name: 'Katsu', surname: 'Don', email: 'katsu@don.com', password: '123qwe123' }))
    
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)