import React, { useContext, useEffect, useState } from 'react'
import Edit from '../imgs/edit.png'
import Delete from '../imgs/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu.jsx'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext.js'
import DOMPurify from 'dompurify'

const Single = () => {
  const [post, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext);

  useEffect(()=>{
    const fetchPostData = async ()=>{
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchPostData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../uploads/${post.img ? post.img : "default.jpg"}`} alt="" />
        <div className="user">
          {post.uimg && <img src={post.uimg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted: {moment(post.date).fromNow()}</p>
          </div>
          {post?.userid === currentUser?.id &&
            <div className="edit">
              <Link className='link' to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          }
        </div>
        <h1>
          {post.title}
        </h1>
         <div className="post-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description)}}></div>
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single;