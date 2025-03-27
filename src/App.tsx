import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Buy from './components/Buy';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyDetails from './components/PropertyDetails';
import Login from './components/auth/login';
import Sell from './components/Sell';
import Marketplace from './components/Marketplace';
import Wishlist from './components/Wishlist';
import Listings from './components/Listings';
import Profile from './components/Profile';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/sell" element={<Sell />}/>
        <Route path="/loans" element={<Marketplace />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/listings" element={<Listings />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  )
}

export default App