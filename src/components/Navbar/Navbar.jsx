import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import arrow_icon from '../../assets/arrow_icon.png'
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="" className='logo'/>
        </Link>
      </div>
      
      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/markets" onClick={toggleMenu}>Markets</Link>
        <Link to="/watchlist" onClick={toggleMenu}>Watchlist</Link>
      </div>
      
      <div className="nav-right">
        <select>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        <button> Sign up <img src={arrow_icon} /></button>
      </div>
    </nav>
  );
};

export default Navbar;