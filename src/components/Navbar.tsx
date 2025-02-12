import React from 'react'

import '../../css/Navbar.css'
export default function Navbar() {
  return (
    <div className="container">
    <div className="navbar">
        <h2>LandLedger</h2>
        <nav>
            <ul>
                <li><a href="#">Buy</a></li>
                <li><a href="#">Rent</a></li>
                <li><a href="#">Home Loans</a></li>
                <li><a href="#">Find an Agent</a></li>
            </ul>
        </nav>
    </div>
    </div>
  )
}

