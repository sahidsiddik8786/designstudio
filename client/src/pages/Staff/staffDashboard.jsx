import React, { useState, useEffect } from "react";
import "./Staff.css";
import StaffHeader from "./StaffHeader";
import Sidebar from "./Sidebar";
import MyChartComponent from "./MyChartComponent";
import { useAuth } from "../../context/auth";
import { Link, Navigate, Redirect } from "react-router-dom";


const StaffHome = () => {
  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/886023/pexels-photo-886023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', // Replace "path/to/your/image.jpg" with the actual path to your image file
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Set minimum height to cover the entire viewport
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [auth, setAuth, loading] = useAuth(); // Destructure loading state from useAuth hook

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Set user as authenticated using the token from local storage
      setAuth(token);
    }
  }, [setAuth]);

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    // Set user as not authenticated
    setAuth(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <>
 
    <div className="grid-container" style={backgroundStyle}>
        
      <div className="col p-2">
        <Link to="/staffprofileup" className="text-decoration-none text-dark">
          <div
            className="p-5 bg-danger text-white shadow-sm d-flex justify-content-between align-items-center rounded"
            style={{ width: "100%", height: "100px" }}
          >
            <h2> Update Profile </h2>
          </div>
        </Link>
      </div>

      <StaffHeader OpenSidebar={OpenSidebar} handleLogout={handleLogout} />

      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <MyChartComponent />

      <div className="row gx-3">
        <div className="col-md-6 my-2">
          <div
            className="p-5 bg-warning text-white shadow-sm d-flex justify-content-between align-items-center rounded"
            style={{ width: "100%", height: "200px" }}
          >
            <div>
              <h3 className="fs-3">2250</h3>
              <p className="fs-5">Delivery</p>
            </div>
            <i className="bi bi-truck p-3 fs-1"></i>
          </div>
        </div>
      
      </div>
      
    </div>

     </>
  );
};

export default StaffHome;
