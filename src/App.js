import React from 'react'
import { BrowserRouter as Router , Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import MusicLibrary from './pages/MusicLibrary'
//adding styles
import '../src/styles/app.scss'

const App = () => {
 
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/musiclibrary' element={<MusicLibrary />} />
      
      </Routes>

    </Router>
    
        </>
  )
}

export default App