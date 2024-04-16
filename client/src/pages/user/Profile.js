import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Validation state
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  // Get user data from context and populate the state
  useEffect(() => {
    const {
      firstname,
      lastname,
      address,
      streetaddress,
      city,
      state,
      postal,
      email,
      phone,
    } = auth?.user;
    setFirstName(firstname);
    setLastName(lastname);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setStreetaddress(streetaddress);
    setCity(city);
    setState(state);
    setPostal(postal);
  }, [auth?.user]);

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    let valid = true;

    if (!firstname) {
      setFirstNameError("First Name is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(firstname)) {
      setFirstNameError("First Name must contain only letters and spaces");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastname) {
      setLastNameError("Last Name is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(lastname)) {
      setLastNameError("Last Name must contain only letters and spaces");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!phone) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!/^[1-9]\d{9}$/.test(phone)) {
      setPhoneError("Invalid phone number format");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!address) {
      setAddressError("Address is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(address)) {
      setAddressError("Address must contain only letters and spaces");
      valid = false;
    } else {
      setAddressError("");
    }

    if (!valid) {
      return;
    }

    try {
      // Send a PUT request to update the user's profile without the password field
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth/profile",
        {
          firstname,
          lastname,
          address,
          streetaddress,
          city,
          state,
          postal,
          email,
          phone,
        }
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        // Update the user's data in the context only after a successful update response
        setAuth({ ...auth, user: data?.updatedUser });

        // Update the user's data in localStorage after a successful update response
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Profile"}>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9 mt-3">
          <form className="form-containe register-form" onSubmit={handleSubmit}>
            <h4 className="title">Profile Update</h4>
            <div className="row mb-3">
              <label htmlFor="firstname" className="form-label">
                Full Name
              </label>
              <div className="col">
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your First-Name"
                  autoFocus
                />
                <span className="text-danger">{firstnameError}</span>
              </div>

              <div className="col">
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Last-Name"
                />
                <span className="text-danger">{lastnameError}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="col">
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="form-control"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <div className="col">
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                  <span className="text-danger">{phoneError}</span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <div className="col">
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />

                  <span className="text-danger">{addressError}</span>
                </div>
              </div>

              <div className="mb-3">
               
                <div className="col">
                  <input
                    type="text"
                    id="streetaddress"
                    value={streetaddress}
                    onChange={(e) => setStreetaddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Street Address"
                  />
                </div>
              </div>
           

            <div className="row ">
              <div className="col">
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control mb-2 rounded"
                  placeholder="Enter Your City"
                />
              </div>

              <div className="col">
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="form-control mb-2 rounded"
                  placeholder="Enter Your State"
                />
              </div>
             
              <div className="mb-3">
            
              <div className="col">
              <input
                type="text"
                id="postal"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className="form-control"
                placeholder="Enter Your Postal Code"
              />
            </div>
            </div>

            </div>
            </div>
            {/* End of Additional Fields */}

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
