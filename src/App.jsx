import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import Index from './Pages/Index'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <>
    
      <Nav />
      <Routes>
        <Route path='/' element={<Index />} />
      </Routes>
      <Footer />
      
    </>
  )
}

export default App
