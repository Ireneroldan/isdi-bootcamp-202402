import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'

import retrieveBoard from './retrieveBoard.ts'
import createBoard from './createBoard.ts'
import retrieveOneBoard from './retrieveOneBoard.ts'

import createTask from './createTask'
import retrieveTask from './retrieveTask.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,

    retrieveBoard,
    createBoard,
    retrieveOneBoard,

    createTask,
    retrieveTask
}

export default logic