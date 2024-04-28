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
import createTask from './createTask'

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,

    CreateBoard,
    retrieveBoards,
    retrieveOneBoard,

    createTask

}

export default logic