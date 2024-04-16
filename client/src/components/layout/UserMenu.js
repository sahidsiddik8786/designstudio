import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderFooter.css"; // Assuming you have the required CSS file
import { useAuth } from "../../context/auth";



const UserMenu = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div className="user-menu-container">
      <div className="sidebar-title">
        <h2>Hello:{auth?.user?.firstname}{auth?.user?.lastname} </h2>
        <div className="menu-divider"></div>
      </div>

      <div className="menu-items">
        <NavLink to="/UserDashboard" className="menu">
          <span>User Details</span>
        </NavLink>

        <NavLink to="/Profile" className="menuitem">
          <span>Profile</span>
        </NavLink>

        <NavLink to="/Orders" className="menuitem">
          <span>Orders</span>
        </NavLink>

        <NavLink to="/Orders" className="menuitem">
          <span>Booked Details</span>
        </NavLink>

        <NavLink to="/site-details" className="menuitem">
          <span>Site Images</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
