import React from 'react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'
import './navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="links">
            <Link to="/shop">Shop</Link>
            <Link to="cart">
            <CiShoppingCart  size={32}/>
            </Link>
        </div>
      
    </div>
  )
}

export default Navbar
