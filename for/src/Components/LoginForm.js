import React, { useState, useContext } from "react";
import '../Css/LoginForm.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inform } from "../Redux-toolkit/mySlice";

const LoginForm = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://theme-backend-8l9z.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
        
      if (res.ok) {  
       alert(data.message || "Login failed");  
        dispatch(inform(data.user))                    
        navigate('/gmail')
      } 
  
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" 
           title="Enter a valid email (must include @ and .)"
          style={{width:'94%'}}
          placeholder="Enter Your Email..."
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
           required
          minlength="10"
           style={{width:'94%'}}
           placeholder="Enter Your Password..."
        />

        <button type="submit" style={{marginTop:'29px'}}>LOGIN</button>
        <h2>OR</h2>
        <button style={{marginTop:'-20px'}} onClick={() => {navigate('/register')}}>SIGNUP</button>
      </form>
    </div>
  );
};

export default LoginForm;
