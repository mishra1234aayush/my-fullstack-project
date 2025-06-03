// src/components/ThemeManager.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Home from './Home'
import { useSelector } from "react-redux";

const ThemeManager = () => {
  const [theme, setTheme] = useState("dark");
    const obj = useSelector((state)=>state.otp.obj)
    const user = obj.user;
    const state = obj.state;

  
  useEffect(() => {
    const southStates = [
      "Tamil Nadu",
      "Kerala",
      "Karnataka",
      "Andhra Pradesh",
      "Telangana",
    ];

    const fetchLocationAndApplyTheme = async () => {
      try {
      
        const currentHour = new Date().getHours();

        const isSouth = southStates.includes(state);
        const isMorning = currentHour >= 10 && currentHour < 12;


        if (isSouth && isMorning) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      } catch (error) {
        console.error("Location fetch failed:", error);
        setTheme("dark");
      }
    };

    if (user) {
      fetchLocationAndApplyTheme();
    } else {
      setTheme("dark");
    }
  }, [user]);

  return <div className={`app-container ${theme}`} style={{backgroundColor : theme == 'dark'? 'black' : 'white'}}>
    <Home />
  </div>;
};

export default ThemeManager;
