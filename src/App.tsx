import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Buy from './components/Buy';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyDetails from './components/PropertyDetails';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/property/:id" element={<PropertyDetails/>} />
      </Routes>
    </Router>
  )
}

export default App