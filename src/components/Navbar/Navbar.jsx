import React from 'react'
import './Navbar.css'
import arrow_icon 

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="" srcset="" />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
        
      </ul>
      <div className="nav-right">
        <select>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        <button> Sign up <img src="" alt="" /></button>
      </div>

    </div>
  )
}

export default Navbar