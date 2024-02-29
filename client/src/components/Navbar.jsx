import React from 'react'
import Logo from "../imgs/logo.png"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <Link className='link' to="/?cat=theoretical">
            <h6>Theoretical</h6>
          </Link>
          <Link className='link' to="/?cat=astronomy">
            <h6>Astronomy</h6>
          </Link>
          <Link className='link' to="/?cat=experimental">
            <h6>Experimental</h6>
          </Link>
          <Link className='link' to="/?cat=maths">
            <h6>Maths</h6>
          </Link>
          <span>user</span>
          <span>logout</span>
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;