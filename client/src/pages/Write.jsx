import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const navigate= useNavigate();
  const state = useLocation().state;
  const [title, setTitle] = useState(state ? state.title : '');
  const [value, setValue] = useState(state ? state.description : '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state ? state.cat : '');
  const [missingInputError, setMissingInputError] = useState('');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:3001/api/upload", formData);
      return (res.data.filename);
    } catch (err) {
      console.log(err);
    }
  }

  
  const handleSubmit = (e) =>{

    e.preventDefault()

    if(!title || !cat || !value){
      setMissingInputError("Please fill out all fields");
    }else{
      sendPost();
    }
    
  };

  const sendPost = async () => {
      const imgURL = await upload();
      try {
        state ? await axios.put(`http://localhost:3001/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgURL : ""
        }, {withCredentials: true, headers: {}}) : axios.post(`http://localhost:3001/api/posts`, {
          title,
          desc: value,
          cat,
          img: file ? imgURL : null,
          date: new Date()
        }, {withCredentials: true, headers: {}})
      } catch (error) {
        console.log("Error fetching data")
      };
      setMissingInputError('')
      navigate("/")
  }
  


  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input type="file" id="file" accept=".png,.jpeg,.jpg,.psd" name="" onChange={e=>setFile(e.target.files[0])} hidden />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
          {missingInputError && <p style={{color: "red", textAlign: "center"}}>{missingInputError}</p>}
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat==="theoretical"} name="cat" value="theoretical" id="theoretical" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="theoretical">Theoretical</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat==="astronomy"} name="cat" value="astronomy" id="astronomy" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="astronomy">Astronomy</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat==="experimental"} name="cat" value="experimental" id="experimental" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="experimental">Experimental</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat==="math"} name="cat" value="math" id="math" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="math">Math</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write;