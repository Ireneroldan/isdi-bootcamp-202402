import registerUser from './registerUser'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import logoutUser from './logoutUser'
import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'
import cleanUpLoggedInUserId from './cleanUpLoggedInUserId'

import CreateBoard from './CreateBoard'
import retrieveBoards from './retrieveBoards'
import retrieveOneBoard from './retrieveOneBoard'
import deleteBoard from './deleteBoard'

import createTask from './createTask'
import retrieveTasks from './retrieveTasks'
import deleteTask from './deleteTask'
import editTask from './editTask'
import retrieveUsers from './retrieveUsers'
import shareBoardWithUsers from './shareBoardWithUsers'
import getSharedBoards from './getSharedBoards'

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,
    retrieveUsers,

    CreateBoard,
    retrieveBoards,
    retrieveOneBoard,
    deleteBoard,

    createTask,
    retrieveTasks,
    deleteTask,
    editTask,

    shareBoardWithUsers,
    getSharedBoards
}

export default logic