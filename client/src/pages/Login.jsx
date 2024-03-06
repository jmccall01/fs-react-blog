import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const [logErr, setLogErr] = useState (null);
  const navigate = useNavigate();

  const {login} = useContext(AuthContext)

  const handleChange = e => {
    setInputs(
      prev => ({...prev, [e.target.name]: e.target.value})
    )
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setLogErr(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder='username' name='username' onChange={handleChange} required />
        <input type="password" placeholder='password' name='password' onChange={handleChange} required />
        <button onClick={handleSubmit}>Login</button>
        {logErr && <p>{logErr}</p>}
        <span>Don't have an account? <Link to="/register">Register Here</Link></span>
      </form>
    </div>
  )
}

export default Login;