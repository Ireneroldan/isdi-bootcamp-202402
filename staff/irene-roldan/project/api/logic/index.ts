import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import retrieveUsers from './retrieveUsers.ts'

import retrieveBoard from './retrieveBoard.ts'
import createBoard from './createBoard.ts'
import retrieveOneBoard from './retrieveOneBoard.ts'

import createTask from './createTask'
import retrieveTask from './retrieveTask.ts'
import deleteTask from './deleteTask.ts'
import editTask from './editTask.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveUsers,

    retrieveBoard,
    createBoard,
    retrieveOneBoard,

    createTask,
    retrieveTask,
    deleteTask,
    editTask
}

export default logic