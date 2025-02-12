import React from 'react'
import '../../css/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  return (
    <section className="Home">
        <section className="Search">
          <p>LandLedger - Smart Real Estate, Secure Investments.</p>
          <div className='searchBar'>
              <input type="text" placeholder='Enter Address, Neighbourhood, ZIP code' />
              <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
        </section>
        <section className="features">
          <div className="box">
            <img src="img\tokenprop.webp" alt="" />
            <h1>Lorem, ipsum.</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam illo eveniet velit cum sunt error ipsam! Ea consequatur animi minima dicta earum minus. Commodi?</p>
          </div>
          <div className="box">
            <img src="img\tokenprop.webp" alt="" />
            <h1>Lorem, ipsum.</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam illo eveniet velit cum sunt error ipsam! Ea consequatur animi minima dicta earum minus. Commodi?</p>
          </div>
          <div className="box">
            <img src="img\tokenprop.webp" alt="" />
            <h1>Lorem, ipsum.</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam illo eveniet velit cum sunt error ipsam! Ea consequatur animi minima dicta earum minus. Commodi?</p>
          </div>
        </section>
    </section>
  )
}
