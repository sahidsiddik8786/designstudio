import React, { useState, useContext } from "react";
import { RecoveryContext } from "../../App";
import axios from "axios";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function OTPInput() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:8080/send-recovery-email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      navigate("/reset");
    } else {
      alert("The code you have entered is not correct, try again or re-send the link");
    }
  }

  const handleInputChange = (value, index) => {
    const newInput = [...OTPinput];
    newInput[index] = value;
    setOTPinput(newInput);

    if (index < 3 && value) {
      // If the current input box is not the last one and has a value, focus on the next box
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">Email Verification</div>
        <div className="description">We have sent a code to your email {email}</div>

        <form>
          <div className="otp-container">
            {OTPinput.map((value, index) => (
              <input
                key={index}
                className="otp-input"
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(e.target.value, index)}
                id={`otp-input-${index}`}
              />
            ))}
          </div>

          <button onClick={verifyOTP} className="verify-button" disabled={disable}>
            Verify Account
          </button>

          <div className="resend-link">
            <span className={`resend-link ${disable ? 'disabled' : ''}`} onClick={resendOTP}>
              Resend OTP
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPInput;
