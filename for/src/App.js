import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import ThemeManager from "./Components/ThemeManager";
import Gmail from "./Components/Gmail";
import Otp from "./Components/Otp";


const App = () => {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/gmail" element={<Gmail />} />
            <Route path="/home" element={ <ThemeManager /> } />
            <Route path="/otp" element={ <Otp /> } />

          </Routes>
        </Router>
  );
};

export default App;
