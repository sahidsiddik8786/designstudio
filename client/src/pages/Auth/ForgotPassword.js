import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../styles/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { RecoveryContext } from "../../App";

function MyComponent() {
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsButtonDisabled(!newEmail);
  }

  function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post("http://localhost:8080/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => {
          setPage("otp");
          navigate("/otpinput");
        })
        .catch(console.log);
      return;
    }
    alert("Please enter your email");
  }

  return (
    <Layout title="Reset Password">
      <div className="form-container text-center rounded p-4">
        <form>
        <h2 className="mb-4">Password Reset</h2>
        <input
          type="text"
          className="form-control rounded-pill"

          placeholder="Email address"
          onChange={handleEmailChange}
        />
        </form>
        <button
          onClick={navigateToOtp}
          disabled={isButtonDisabled}
          className=" btn-primary btn-lg rounded-pill"
        >
          Send OTP
        </button>
      </div>
      <Toaster />
    </Layout>
  );
}

export default MyComponent;
