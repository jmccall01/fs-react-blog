import React from 'react'
import Logo from "../imgs/footer-logo.png"

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="logo" />
      <span>A full stack project - React, Express, Node, PostgreSQL</span>
    </footer>
  )
}

export default Footer;