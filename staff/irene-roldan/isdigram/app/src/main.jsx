import { logger, Logger } from './utils'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.sass'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'express'

logger.level = Logger.DEBUG

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>
  // </React.StrictMode>,
)
