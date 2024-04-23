import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'

import retrieveBoard from './retrieveBoard.ts'
import createBoard from './createBoard.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,

    retrieveBoard,
    createBoard
}

export default logic