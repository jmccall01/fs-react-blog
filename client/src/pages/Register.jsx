import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from  'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [regErr, setRegErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(
      prev => ({...prev, [e.target.name]: e.target.value})
    )
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', inputs);
      navigate("/login")
    } catch (error) {
      setRegErr(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder='username' name='username' onChange={handleChange} required />
        <input type="email" placeholder="email" name='email' onChange={handleChange} required />
        <input type="password" placeholder='password' name='password' onChange={handleChange} required />
        <button onClick={handleSubmit}>Register</button>
        {regErr && <p>{regErr}</p>}
        <span>Already have an account? <Link to="/login">Login Here</Link></span>
      </form>
    </div>
  )
}

export default Register;