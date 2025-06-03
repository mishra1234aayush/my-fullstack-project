import React, { useRef, useState } from "react";
import "../Css/Otp.css";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);
  const location = useLocation();
  const otpNumber = location.state.otp;
  const navigate = useNavigate();
   console.log(otpNumber);
   
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      inputs.current[5].focus();
    }
    e.preventDefault();
  };

 const handleSubmit = (e) => {
    
  e.preventDefault();
  const fullOtp = otp.join("");
      console.log(fullOtp);
      
  if (fullOtp.length !== 6) {
    return alert("Please enter all 6 digits");
  }

  if (otpNumber && Number(fullOtp) !== otpNumber) {
    return alert("❌ Invalid OTP. Please try again.");
  }

    alert('✅  OTP verified. Proceeding to the next step...')
    navigate('/home')

};


  return (
    <form className="otp-form" onSubmit={handleSubmit}>
      <h2>Enter OTP</h2>
      <div className="otp-box" onPaste={handlePaste}>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength="1"
            className="otp-input"
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputs.current[idx] = el)}
          />
        ))}
      </div>
      <button type="submit" className="otp-button">Verify OTP</button>
    </form>
  );
};

export default Otp;
