import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Starter.css";
import logo from "../assets/logo1.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

const SignupForm = () => {
  const startValues = { username: "", email: "", password: "" };
  const [regformValues, setRegformValues] = useState(startValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setRegformValues({ ...regformValues, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!regformValues.username.trim()) {
      validationErrors.username = "username is required";
      alert("Please provide username.");
    }
    if (!regformValues.email.trim()) {
      validationErrors.email = "email is required";
      alert("Please provide email.");
    } else if (!/\S+@\S+\.\S+/.test(regformValues.email)) {
      validationErrors.email = "email is not valid";
      alert("Email is not valid.");
    }

    if (!regformValues.password.trim()) {
      validationErrors.password = "password is required";
      alert("Please provide password.");
    } else if (regformValues.password.length < 4) {
      validationErrors.password = "password must be more than 4 characters";
      alert("Password must be more than 4 characters");
    } else if (regformValues.password.length > 10) {
      validationErrors.password =
        "password must not be more than 10 characters";
      alert("Password must not be more than 10 characters");
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      try {
        setLoading(true);

        const response = await axios.post("http://localhost:4000/signup", {
          username: regformValues.username,
          email: regformValues.email,
          password: regformValues.password,
        });
        console.log("Response", response.data);
        setLoading(false);
        if (response.data == "username exist") {
          alert("Username already exist");
        } else if (response.data == "Email exists") {
          alert("Email already exists");
        } else if (response.data.message == "User Created") {
          alert(
            "An email has been sent to your registered email id. Please verify it!"
          );
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        alert("Signup Failed !");
      } finally {
        // toast.success(
        //   "An email has been sent to your registered email id. Please verify it!",
        //   {
        //     className: "toast-message",
        //     autoClose: false,
        //   }
        // );
      }
    }
  };
  return (
    <div className="bg-login">
      <div className="company-logo1">
        <img src={logo} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      {loading ? (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="white"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      ) : (
        <form className="container">
          <div className="col form-box register">
            <p className="title">Sign Up</p>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={regformValues.username}
                onChange={handleChanges}
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={regformValues.email}
                onChange={handleChanges}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={regformValues.password}
                onChange={handleChanges}
              />
            </div>
            <button type="submit" className="button1" onClick={handleOnSubmit}>
              Register
            </button>
            <button
              className="toggle-form register-link"
              onClick={handleLoginClick}
            >
              Already have an account ? Login
            </button>
          </div>
        </form>
      )}
      <ToastContainer position="top-left" />
    </div>
  );
};

export default SignupForm;
