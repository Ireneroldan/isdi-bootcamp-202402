import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import retrieveUsers from './retrieveUsers.ts'

import retrieveBoard from './retrieveBoard.ts'
import createBoard from './createBoard.ts'
import retrieveOneBoard from './retrieveOneBoard.ts'

import createTask from './createTask.ts'
import retrieveTask from './retrieveTask.ts'
import deleteTask from './deleteTask.ts'
import editTask from './editTask.ts'

import shareBoardWithUsers from './shareBoardWithUsers.ts'
import getShareBoards from './getShareBoards.ts'
import deleteBoard from './deleteBoard.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveUsers,

    retrieveBoard,
    createBoard,
    retrieveOneBoard,
    deleteBoard,

    createTask,
    retrieveTask,
    deleteTask,
    editTask,


    shareBoardWithUsers,
    getShareBoards
}

export default logic