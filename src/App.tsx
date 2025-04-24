import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Buy from './components/Buy';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyDetails from './components/PropertyDetails';
import Login from './components/auth/Login';
import Sell from './components/Sell';
import Marketplace from './components/Marketplace';
import Wishlist from './components/Wishlist';
import Listings from './components/Listings';
import Profile from './components/Profile';
import SignupPage from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Aiprediction from './components/Aiprediction';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aipredict"
          element={
            <ProtectedRoute>
              <Aiprediction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App