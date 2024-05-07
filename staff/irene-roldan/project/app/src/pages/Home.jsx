import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'
import CreateBoard from '../components/createBoard'
import BoardList from '../components/BoardList'
import BoardPage from './BoardPage'
import EditBoard from '../components/EditBoard'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [board, setBoard] = useState(null)
    const [sharedBoards, setSharedBoards] = useState([])

    const { showFeedback } = useContext()

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => showFeedback(error, 'error'))
                .then(user => {
                    if (user) {
                        getSharedBoards(user.id)
                            .then(setSharedBoards)
                            .catch(error => showFeedback(error, 'error'))
                    }
                })
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView(null)

    const handleCreateBoardCancelClick = () => clearView()

    const handleBoardCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            onUserLoggedOut()
        }
    }

    const handleCreateBoardClick = () => setView('create-board')
        
    const handleEditBoardCancelClick = () => clearView()

    const handleEditBoardClick = board => {
        setView('edit-board')
        setBoard(board)
    }

    const handleBoardEdited = () => {
        clearView()
        setStamp(Date.now())
        setBoard(null)
    }

    logger.debug('Home -> render') 

    return <>
        <header className="bg-white">
    {user && (
        <>
            <h1 className="text-2xl text-gray-800 p-4">Welcome,</h1>
            <h1 className="text-2xl text-gray-800 font-bold p-4">{user.name}</h1>
        </>
    )}
    
</header>

        <main className="bg-white">
        <nav>
        <button onClick={handleLogoutClick} className="p-3" style={{ fontSize: '24px' }}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 1024 1025"><path fill="#333333" d="M896 1025H448q-53 0-90.5-37.5T320 897v-64q0-27 18.5-45.5t45-18.5t45.5 18.5t19 45t18.5 45.5t45.5 19h256q26 0 45-19t19-45V192q0-26-19-45t-45-19H512q-27 0-45.5 19T448 192.5T429 238t-45.5 19t-45-19t-18.5-46v-64q0-53 37.5-90.5T448 0h448q53 0 90.5 37.5T1024 128v769q0 53-37.5 90.5T896 1025M704 384q26 0 45 19t19 45v129q0 26-19 45t-45 19H256v101q0 11-13.5 19t-32 7t-29.5-12L18 556Q0 538 0 512.5T18 469l163-200q11-11 29.5-11.5t32 7.5t13.5 20v99z"/></svg></button>
         </nav>
            <Routes>
                <Route path="/" element={<BoardList stamp={stamp} onEditBoardClick={handleEditBoardClick} sharedBoards={sharedBoards}/>} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/board/:boardId" element={<BoardPage />}></Route>
            </Routes>

            {view === 'create-board' && <CreateBoard onCancelClick={handleCreateBoardCancelClick} onBoardCreated={handleBoardCreated} />}

            {view === 'edit-board' && <EditBoard board={board} onCancelClick={handleEditBoardCancelClick} onBoardEdited={handleBoardEdited}/>} 
            <button onClick={handleCreateBoardClick}>Add new Board</button>
        </main>
    </>
}

export default Home