import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminMenu.css';

const AdminMenu = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(prevState => !prevState);
  };

  return (
    <div id="wrapper">
      <div className={`admin-menu ${isToggled ? 'toggled' : ''}`}>
        <div className="toggle-button" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="sidebar-content">
        <NavLink to="/Dashboard/AdminDashboard" activeClassName="active" className="menu-item">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </NavLink>

          <NavLink to="/Dashboard/AdminDashboard/adminregister" activeClassName="active" className="menu-item">
            <i className="fas fa-user-plus icon"></i> Registration
          </NavLink>
          <NavLink to="/Dashboard/AdminDashboard/create-category" activeClassName="active" className="menu-item">
            <i className="fas fa-plus-square icon"></i> Create Category
          </NavLink>
    
        <NavLink to="/Dashboard/AdminDashboard/create-subcategory" activeClassName="active" className="menu-item">
        <i className="fas fa-box-open"></i> Create SubCategory
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-product" activeClassName="active" className="menu-item">
        <i className="fas fa-image"></i> Create Product
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/products" activeClassName="active" className="menu-item">
        <i className="fas fa-chalkboard-teacher"></i> Product
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-categorydesign" activeClassName="active" className="menu-item">
        <i className="fas fa-chart-bar"></i>  Create Category for design
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/designimages" activeClassName="active" className="menu-item">
        <i className="fas fa-cog"></i> Upload Category Based Images
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-subcategorydesign" activeClassName="active" className="menu-item">
        <i className="fas fa-question-circle"></i>  Create SubCategory for design
        </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
