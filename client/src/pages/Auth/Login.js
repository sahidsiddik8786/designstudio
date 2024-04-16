import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import BackgroundSlider from "../../components/Background/Backgroundslider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/v1/both/general-login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Login successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        switch (res.data.user.role) {
          case "1":
            navigate("/Dashboard/AdminDashboard");
            break;
          case "2":
            navigate("/staff-dashboard");
            break;
          default:
            navigate("/UserDashboard");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login">
      <div className="login-background-container">
        <BackgroundSlider />
        <div className="login-overlay-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Sign In</h2>
            <div className="input-group m-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Email"
                required
              />
              {emailError && <p className="error-text">{emailError}</p>}
            </div>
            <div className="input-group m-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Password"
                required
              />
              {passwordError && <p className="error-text">{passwordError}</p>}
            </div>
            <div className="forgot-password-link">
              <NavLink to="/forgotpassword" className="forgot-link">
                <h5>Forgot Password</h5>
              </NavLink>
            </div >
            <button type="submit" className="submit-button m-2" disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </button>
            <p className="register-link">
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </p>
          </form>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Login;
