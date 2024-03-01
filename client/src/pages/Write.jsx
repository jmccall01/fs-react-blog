import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {

  const [value, setValue] = useState('');
  console.log(value)

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Title' />
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
          <input type="file" id="file" name="" hidden />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a graft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" value="theoretical" id="theoretical"/>
            <label htmlFor="theoretical">Theoretical</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="astronomy" id="astronomy"/>
            <label htmlFor="astronomy">Astronomy</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="experimental" id="experimental"/>
            <label htmlFor="experimental">Experimental</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="math" id="math"/>
            <label htmlFor="math">Math</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write;