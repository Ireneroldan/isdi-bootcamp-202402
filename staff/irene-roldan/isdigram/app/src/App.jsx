import {logger} from "./utils";

import logic from "./logic"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'

function App() {

  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/home')

  const handleUserLoggedOut = () => goToLogin()

  logger.debug('App -> render')

  return <>
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/"/> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn}/>} />
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/"/> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginIn}/>} />
      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />    
      </Routes>
  </>
  
  
  
}

export default App