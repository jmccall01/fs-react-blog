import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(()=>{
    const fetchPostData = async ()=>{
      try {
        const res = await axios.get(`/posts/${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchPostData();
  }, [cat])

  return (
    <div className="home">
      <div className="posts">
        {posts.map(post=>{
          return(
            <div className="post" key={post.id}>
            <div className="img">
              <img src={`./uploads/${post.img ? post.img : "default.jpg"}`} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description.split("</p>")[0] + " <br/>...</p>")}}></div>
              <Link className='link' to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
            <hr />
          </div>
          )
        })}
      </div>
    </div>
  )
}


export default Home;