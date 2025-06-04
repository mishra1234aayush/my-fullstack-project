import axios from "axios";
import React, { useState } from "react";
import "../Css/RegisterForm.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const states = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("https://theme-backend-8l9z.onrender.com/api/auth/register", formData);
     
      if (res.ok) {
        setMessage("Registration successful! You can now login.");
        setFormData({ name: "", email: "", password: "", state: "" });
      } else {
        alert(res.data.message || "Registration failed.");
                navigate('/')

      }
    } catch (error) {      
      setMessage("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
           minlength="3"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" 
           title="Enter a valid email (must include @ and .)"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          minlength="10"
        />

        <label>State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select your state
          </option>
          {states.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
