import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {handleError, handleSuccess} from "../utils.js"
import axios from "axios"
const SignUp = () => {

  const [signInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password:""
  })
const navigate= useNavigate()
  const handleChange = (e)=>{
    const{name, value} = e.target;
    const copySignupInfo = {...signInfo}
    copySignupInfo[name] = value
    setSignupInfo(copySignupInfo)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {name, email, password} = signInfo;
    if(!name || !email || !password){
      return handleError("name, email and password are required!")
    }
    try {
      const response = await axios.post("https://auht-0.onrender.com/auth/signup", 
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.data;
      const {success, message} = result;
      if(success){
        handleSuccess(message)
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }
    }catch(error){
        const errorMessage = error.response.data.error.details[0].message;
        handleError(errorMessage)
    }
  }
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            onChange={handleChange}
            value={signInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            value={signInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            value={signInfo.password}
          />
        </div>
        <button type="submit">Sign Up</button>
        <span>
          Already have an account?&nbsp;
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
