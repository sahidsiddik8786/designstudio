import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/umd/popper.min.js";

// Import the StaffLogin component
import StaffLogin from "./LoginStaff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation(); 

  // State for real-time validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous validation errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      toast.error("Email is required");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });

      console.log("Server Response:", res);

      if (res && res.data.success) {
      
        toast.success(res.data && res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

    
        localStorage.setItem("auth", JSON.stringify(res.data));

        setTimeout(() => {
          if (res.data.user.role === "1") {
            navigate(location.state || "/Dashboard/AdminDashboard");
          }  
          else if (res.data.user.role === "2") {
            navigate(location.state || "/staff-dashboard");
          }else {
            navigate(location.state || "/Dashboard/UserDashboard");
          }
        }, 100);


      } else {
        // Unsuccessful login
        if (res.status === "User is deactivated") {
          // User is deactivated, show an error message
          toast.error("User is deactivated");
        } else {
          // Other login errors
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      // Something went wrong with the request
      console.log(error);
      toast.error("Contact Admin");
    }
  };

  return (
    <Layout title="Login">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="rounded p-5 bg-light w-50">
        <h3 className="title" style={{ color: 'black' }}>Sign In</h3>


          <div className=" mb-3 w-100">
            <input
              name="email"
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="mb-3 w-100">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              type="password"
              placeholder="Enter Your Password"
              required
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <div className="mb-3 w-100">
            <NavLink to="/forgotpassword" className="forgot-link">
              <h5>Forgot Password</h5>
            </NavLink>
          </div>
          <div className="mb-3">
            <p>
              <h5>Don't have an account?</h5>
            </p>
          
        <NavLink to="/register" className="btn-default rounded-p4 ">
          <h5><center>Sign up</center></h5>
        </NavLink>  

          </div>

          <button
            type="submit"
            className="w-50 btn-primary rounded-pill"
            name="button1"
          >
            Sign In
          </button>

          {/* Button to switch to staff login 
          <NavLink to="/Login-staff" className="btn btn-link" style={{ color: 'black' }}>
            Login as Staff
          </NavLink>*/}
        </form>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Login;