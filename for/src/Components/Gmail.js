import React, { useState } from "react";
import "../Css/Gmail.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Gmail = () => {
  const [gmail, setGmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const obj = useSelector((state)=>state.otp.obj)
    
  const handleChange = (e) => {
    setGmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
        if(gmail)
        {
          try {
      const res = await fetch("https://theme-backend-8l9z.onrender.com/api/auth/gmailOtp", { method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({gmail}), });

      const data = await res.json();
        console.log(data);
        
        alert(data.message || " failed");
         navigate('/otp',{
                    state : {
                        otp : data.otp
                    }
                  })
    } catch (error) {
      alert("Error: " + error.message);
    }
}


    else if(phone)
        {
          try {
      const res = await fetch("http://localhost:5000/api/auth/phoneOtp", { method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({phone}), });

      const data = await res.json();
        
        alert(data.message || " failed");
                  navigate('/otp',{
                    state : {
                        otp : data.otp
                    }
                  })

    } catch (error) {
      alert("Error: " + error.message);
    }
}
  };

  return (
    <form className="gmail-form">
        
        {obj.state == 'Other' ? <><h2>Enter Your Phone Number</h2> <p>This helps us verify if you're from a Other state.</p></> 
         :
         <> <h2>Enter Your Gmail</h2> <p>This helps us verify if you're from a South Indian state.</p></>
}

      <div className="gmail-box">
        {obj.state == 'Other' ?
      <input type="number" className="number-input" placeholder="Enter Your Phone Number..." required minlength="10" maxLength='10' value={phone} onChange={(q)=>{setPhone(q.target.value)}} style={{width:'94%',height:'24px'}}  />
      :
        <input type="email" className="gmail-input" placeholder="Enter Your Gmail..." required pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" title="Enter a valid email (must include @ and .)"value={gmail} onChange={handleChange} style={{width:'94%'}}  />
      }
      </div>
      <button type="submit" className="gmail-button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Gmail;
