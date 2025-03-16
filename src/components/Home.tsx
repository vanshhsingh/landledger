import React from 'react'
import '../../css/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Features from './Features';


export default function Home() {
  return (
    <section className="Home">
        <section className="Search">
          <h1>LandLedger - Smart Real Estate, Secure Investments.</h1>
          <div className='searchBar'>
              <input type="text" placeholder='Enter Address, Neighbourhood, ZIP code' />
              <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
        </section>
        <section className="features">
          <Features/>
        </section>
    </section>
  )
}
