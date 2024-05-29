import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./About-us/aboutus";
import SignupForm from "./Authorization/SignupForm";
import LoginForm from "./Authorization/LoginForm";
import Profile from "./Profile/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <div>
            <div className="d-flex flex-row min-vh-100 ">
              <Navbar handleLogout={handleLogout} />
              <div className="container-fluid dashboard content-cointainer mt-0 px-0">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />{" "}
            <Route path="/" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
