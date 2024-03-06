import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({cat}) => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPostData = async ()=>{
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        const diffPosts = res.data.filter((p)=> p.id != postId)
        setPosts(diffPosts);
      } catch (error) {
        console.log(error)
      }
    }
    fetchPostData();
  }, [cat, postId]);

  return (
    <div className="menu">
        <h1>Other posts you might like</h1>
        {posts.map(post=>(
            <div className="post" key={post.id}>
                <img src={`../uploads/${post.img ? post.img : "default.jpg"}`} alt="" />
                <h2>{post.title}</h2>
                <Link className='link' to={`/post/${post.id}`}>
                  <button>Read more</button>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Menu