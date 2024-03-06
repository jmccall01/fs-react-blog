import React, {useContext} from 'react'
import Logo from "../imgs/logo.png"
import {Link} from "react-router-dom"
import { AuthContext } from '../context/authContext'

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link className='link' to="/">
            <img src={Logo} alt="logo" />
          </Link>
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
          { currentUser && <span className="noLink username">{currentUser.username}</span>}
          {currentUser ? <span className='sign-in-out' onClick={logout}>logout</span> : <Link className='link sign-in-out' to="/login">login</Link>}
          <span className='write'>
            <Link className='link' to={currentUser ? "/write" : "/login"}>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;