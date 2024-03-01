import React from 'react'
import Edit from '../imgs/edit.png'
import Delete from '../imgs/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu.jsx'

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="https://images.unsplash.com/photo-1528484701073-2b22dc76649e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="user">
          <img src="https://static01.nyt.com/images/2007/12/19/us/physicsnew600.jpg?quality=75&auto=webp&disable=upscale" alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link className='link' to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>
          Dummy title
        </h1>
        <p>
          Dummy text
        </p>
      </div>
      <Menu />
    </div>
  )
}

export default Single;