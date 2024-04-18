/*import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./HeaderFooter.css";


const AdminMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`admin-menu ${sidebarOpen ? "open" : ""}`}>
      <div className="w3-sidebar w3-bar-block w3-card" id="mySidebar">

        <NavLink to="/Dashboard/AdminDashboard" className="list-group-item list-group-item-action" onClick={closeSidebar}>
          Dashboard
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-category" className="list-group-item list-group-item-action" onClick={closeSidebar}>
          Create Category
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-product" className="list-group-item list-group-item-action" onClick={closeSidebar}>
          Create Product
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/products" className="list-group-item list-group-item-action" onClick={closeSidebar}>
          Product
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/Users" className="list-group-item list-group-item-action" onClick={closeSidebar}>
          Users
        </NavLink>
      </div>
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        &#9776;
      </button>
    </div>
  );
};

export default AdminMenu;*/
