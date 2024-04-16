import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("weak");
  const navigate = useNavigate();

  const handleWhitespaceValidation = (value) => {
    if (value.trim() !== value) {
      toast.dismiss();
      toast.error("Leading or trailing whitespace is not allowed.");
      return false;
    }
    return true;
  };

  const handleNameValidation = (value) => {
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(value)) {
      toast.dismiss();
      toast.error("Name should contain only alphabetic characters.");
      return false;
    }
    return true;
  };

  const handlePhoneValidation = (value) => {
    const phonePattern = /^[0-9]*$/;
    if (!phonePattern.test(value)) {
      toast.dismiss();
      toast.error("Phone number should contain only numbers.");
      return false;
    }

    if (value.length !== 10) {
      toast.dismiss();
      toast.error("Phone number should be 10 digits long.");
      return false;
    }

    return true;
  };

  const handlePhoneZeroValidation = (value) => {
    if (/0{10}/.test(value)) {
      toast.dismiss();
      toast.error("Phone number cannot contain 10 consecutive zeros.");
      return false;
    }
    return true;
  };

  const handlePasswordStrength = (value) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (passwordPattern.test(value)) {
      setPasswordStrength("strong");
    } else if (value.length >= 8) {
      setPasswordStrength("moderate");
      toast.dismiss();
      toast.error(
        "Password is too weak. It should contain at least one letter and one number."
      );
    } else {
      setPasswordStrength("weak");
      toast.dismiss();
      toast.error(
        "Password is too weak. It should contain at least one letter and one number."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !address ||
      !streetaddress||
      !city ||
      !state ||
      !postal ||
      !email ||
      !password ||
      !phone
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!handleWhitespaceValidation(firstName)) return;
    if (!handleWhitespaceValidation(lastName)) return;
    if (!handleWhitespaceValidation(email)) return;
    if (!handleWhitespaceValidation(password)) return;
    if (!handleWhitespaceValidation(phone)) return;
    if (!handlePhoneValidation(phone)) return;
    if (!handlePhoneZeroValidation(phone)) return;

    if (passwordStrength === "weak") {
      toast.error("Password is too weak.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstName,
          lastName,
          address,
          streetaddress,
          city,
          state,
          postal,
          email,
          password,
          phone,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 100);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register">
      <div className="form-container">
        <form className="form-containe register-form" onSubmit={handleSubmit}>
          <h4 className="title">  Sign Up  </h4>
          <div className="row mb-3">
            <h5 className="text-left">Full Name</h5>
            <div className="col">
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  handleWhitespaceValidation(e.target.value);
                  handleNameValidation(e.target.value);
                }}
                className="form-control mb-2 rounded"
                placeholder="First name"
                required
                autoFocus
              />
            </div>

            <div className="col">
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  handleWhitespaceValidation(e.target.value);
                  handleNameValidation(e.target.value);
                }}
                className="form-control mb-2 rounded"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="mb-2 w-100">
            <h5 className="text-left">Address</h5>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Street Address"
              required
            />
          </div>

          <div className="mb-2 w-100">
            <input
              type="text"
              value={streetaddress}
              onChange={(e) => {
                setStreetaddress(e.target.value);
               
              }}
              className="form-control mb-2 rounded"
              placeholder="Street Address Line 2"
              required
            />
          </div>

          <div className="row mb-3 w-100">
            <div className="col ">
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  handleWhitespaceValidation(e.target.value);
                }}
                className="form-control mb-2 rounded"
                placeholder="City"
                required
                autoFocus
              />
            </div>

            <div className="col">
              <input
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  handleWhitespaceValidation(e.target.value);
                }}
                className="form-control mb-2 rounded"
                placeholder="State"
                required
              />
            </div>
          </div>

          <div className="mb-2 w-100">
            <input
              type="postal"
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
                handleWhitespaceValidation(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Postal / Zip Code"
              required
            />
          </div>

          <div className="row mb-3">
              <h5 className="text-left">E-mail</h5>
              <div className="col">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleWhitespaceValidation(e.target.value);
                }}
                className="form-control mb-2 rounded"
                placeholder="Email"
                required
              />
            </div>

            <h5 className="text-left">Phone Number</h5>
            <div className="col">
              <div className="input-group">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    handleWhitespaceValidation(e.target.value);
                    handlePhoneValidation(e.target.value);
                    handlePhoneZeroValidation(e.target.value);
                  }}
                  className="form-control rounded mb-2"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-2 w-100">
            <h5 className="text-left">Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleWhitespaceValidation(e.target.value);
                handlePasswordStrength(e.target.value);
              }}
              className="form-control mb-2 rounded"
              placeholder="Password"
              required
            />
            <div className={`password-strength ${passwordStrength}`} />
          </div>

          <button type="submit" className=" w-50 btn-primary rounded-pill">
            Sign Up
          </button>

          <p>
            
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
      
        </form>
        <Toaster />
      </div>
    </Layout>
  );
};

export default Register;

{/*import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        data
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 100);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register">
      <div className="form-container">
        <form
          className="form-containe register-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="title"> Sign Up </h4>
          <div className="row mb-3">
            <h5 className="text-left">Full Name</h5>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Name should contain only alphabetic characters",
                },
              }}
              render={({ field }) => (
                <div className="col">
                  <input
                    {...field}
                    type="text"
                    className="form-control mb-2 rounded"
                    placeholder="First name"
                    required
                    autoFocus
                  />
                  {errors.firstName && <span>{errors.firstName.message}
                  {toast.error(errors.firstName.message)}
                  </span>}
                </div>
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Last name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message:
                    "Last name should contain only alphabetic characters",
                },
              }}
              render={({ field }) => (
                <div className="col">
                  <input
                    {...field}
                    type="text"
                    className="form-control mb-2 rounded"
                    placeholder="Last name"
                    required
                  />
                  {errors.lastName && <span>{errors.lastName.message}
                  {toast.error(errors.lastName.message)}
                  </span>}
                </div>
              )}
            />
          </div>

          <Controller
            name="streetAddress"
            control={control}
            rules={{
              required: "Street address is required",
            }}
            render={({ field }) => (
              <div className="mb-2 w-100">
                <input
                  {...field}
                  type="text"
                  className="form-control mb-2 rounded"
                  placeholder="Street Address"
                  required
                />
                {errors.streetAddress && (
                  <span>{errors.streetAddress.message}
                  {toast.error(errors.streetAddress.message)}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="streetAddress2"
            control={control}
            rules={{
              required: false, // You can adjust the rules as needed
            }}
            render={({ field }) => (
              <div className="mb-2 w-100">
                <input
                  {...field}
                  type="text"
                  className="form-control mb-2 rounded"
                  placeholder="Street Address Line 2"
                />
                {errors.streetAddress2 && (
                  <span>{errors.streetAddress2.message}
                  
                  </span>
                )}
              </div>
            )}
          />

          <div className="row mb-3 w-100">
            <Controller
              name="city"
              control={control}
              rules={{
                required: "City is required",
              }}
              render={({ field }) => (
                <div className="col">
                  <input
                    {...field}
                    type="text"
                    className="form-control mb-2 rounded"
                    placeholder="City"
                    required
                  />
                  {errors.city && <span>{errors.city.message}</span>}
                </div>
              )}
            />

            <Controller
              name="state"
              control={control}
              rules={{
                required: "State is required",
              }}
              render={({ field }) => (
                <div className="col">
                  <input
                    {...field}
                    type="text"
                    className="form-control mb-2 rounded"
                    placeholder="State"
                    required
                  />
                  {errors.state && <span>{errors.state.message}</span>}
                </div>
              )}
            />
          </div>

          <Controller
            name="postal"
            control={control}
            rules={{
              required: "Postal/Zip Code is required",
            }}
            render={({ field }) => (
              <div className="mb-2 w-100">
                <input
                  {...field}
                  type="text"
                  className="form-control mb-2 rounded"
                  placeholder="Postal/Zip Code"
                  required
                />
                {errors.postal && <span>{errors.postal.message}</span>}
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <div className="col">
                <input
                  {...field}
                  type="email"
                  className="form-control mb-2 rounded"
                  placeholder="Email"
                  required
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number should be 10 digits long",
              },
            }}
            render={({ field }) => (
              <div className="col">
                <input
                  {...field}
                  type="text"
                  className="form-control mb-2 rounded"
                  placeholder="Phone"
                  required
                />
                {errors.phone && <span>{errors.phone.message}</span>}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message:
                  "Password should be at least 8 characters and include both letters and numbers",
              },
            }}
            render={({ field }) => (
              <div className="mb-2 w-100">
                <input
                  {...field}
                  type="password"
                  className="form-control mb-2 rounded"
                  placeholder="Password"
                  required
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>
            )}
          />

          <button type="submit" className=" w-50 btn-primary rounded-pill">
            Sign Up
          </button>

          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
};

export default Register;
*/}

