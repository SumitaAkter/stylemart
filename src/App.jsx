import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import Index from './Pages/Index'
import Footer from './Components/Footer/Footer'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import Checkout from './Pages/Checkout'
import About from './Pages/About'
import Shop from './Pages/Shop'

function App() {
  return (
    <>
    
      <Nav />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/Checkout' element={<Checkout />} />
        <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
      <Footer />
      
    </>
  )
}

export default App
