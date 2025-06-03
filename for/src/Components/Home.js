// src/components/Home.jsx
import React from "react";
import '../Css/Home.css'
import { useSelector } from "react-redux";

const Home = () => {
   const obj = useSelector((state)=>state.otp.obj)


  return (

    <div className="home-container" >
      <h1 style={{fontSize:'55px'}}>Welcome, {obj.name}!</h1>
      <h3>State :  {obj.state === 'Other'? 'Other': `${obj.state} South India`}</h3>
      <p>Your current plan: {obj.plan}</p>
      <p>Login State & Theme active based on time and location.</p>
    </div>
  );
};

export default Home;
