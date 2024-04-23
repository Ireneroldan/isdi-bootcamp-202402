import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'
import CreateBoard from '../components/createBoard'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)

    const { showFeedback } = useContext()

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => showFeedback(error, 'error'))
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
        
    

    return <>
        <header>
            {user && <h1>Welcome, {user.name}</h1>}

            <nav>
                <button onClick={handleLogoutClick}>❌</button>
            </nav>
        </header>

        <main>
            <Routes>
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>

            {view === 'create-board' && <CreateBoard onCancelClick={handleCreateBoardCancelClick} onBoardCreated={handleBoardCreated} />}

            {view === 'edit-board' && <EditBoard board={board} onCancelClick={handleEditBoardCancelClick} onBoardEdited={handleBoardEdited}/>} 

            <button onClick={handleCreateBoardClick}>Add new Board</button>

        </main>
    </>
}

export default Home