import { logger } from './utils'

import logic from './logic'
import Login from './pages/Login'
import Register from './pages/Register'
import BoardPage from './pages/BoardPage'
import Archived from './pages/Archived'
import Home from './pages/Home'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Feedback from './components/Feedback'
import { useState } from 'react'
import { Context } from './context'
import Confirm from './components/Confirm'
import { errors } from 'com'

const { UnauthorizedError } = errors

function App() {
  const [feedback, setFeedback] = useState(null)
  const [confirm, setConfirm] = useState(null) 

  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/')

  const handleUserLoggedOut = () => goToLogin()

  const handleFeedbackAcceptClick = () => setFeedback(null)

  const handleBackHome = () => navigate('/')


  const handleFeedback = (error, level = 'warn') => {
    console.log(error)
    if (error instanceof UnauthorizedError) {
      logic.logoutUser()

      level = 'error'

      goToLogin()
    }

    setFeedback({ message: error.message, level })
  }
  

  const handleConfirm = (message, callback) => setConfirm({ message, callback })

  const handleConfirmCancelClick = () => {
    confirm.callback(false)

    setConfirm(null)
  }

  const handleDeleteTask = () => {
    confirm.callback(true)

    setConfirm(null)
  }

  logger.debug('App -> render')

  return <>
    <Context.Provider value={{ showFeedback: handleFeedback, showConfirm: handleConfirm }}>
      <Routes>
        <Route path="/archived" element={<Archived />} />
        <Route path="/board/:userId/:taskId" element={<BoardPage />} />
        <Route path="/BoardPage/:boardId" element={<BoardPage />} />
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />
        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />
        <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
      </Routes>
    </Context.Provider>

    {feedback && <Feedback message={feedback.message} level={feedback.level} onAcceptClick={handleFeedbackAcceptClick} />}

    {confirm && <Confirm message="Do you want delete the task?" onCancelClick={handleConfirmCancelClick} onAcceptClick={handleDeleteTask} />}
  </>
}

export default App

