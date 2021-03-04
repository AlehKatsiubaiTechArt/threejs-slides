import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Slides from './components/Slides'
import { slides } from './presentation'
import { LinearProgress } from '@material-ui/core'

function App() {
  return (
    <Router>
      <Slides slides={slides} />
    </Router>
  )
}

export default App
