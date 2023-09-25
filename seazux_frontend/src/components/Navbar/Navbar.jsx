import React from 'react'
import './Navbar.css'
import logo1 from '../../images/logo1.png';
// import check from '../../images/check.png'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar__logo'>
            {/* <h1><span id='logo-u'>Sea</span>zus</h1> */}
            <img src={logo1} alt="" srcset="" id="logo-u"/>
        </div>
        <div className='navbar__links'>
            <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="/v/login">Login</a></li>
                <li><a href="/v/signup">Signup</a></li>
                <li><a href="#Fqr">FAQ</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar