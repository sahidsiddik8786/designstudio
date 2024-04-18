import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'; // Import useAuth hook
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const [auth, setAuth] = useAuth(); // Destructure setAuth from useAuth
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("Logout button clicked");
    localStorage.removeItem('token'); // Remove token from local storage
    setAuth(null); // Update authentication state
    console.log("Auth after logout:", auth);
    navigate('/login');
};

  
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          STAFF DASHBOARD
      <div className="sidebar-list">
  
      </div>
      </div>
      </div>

      <ul className='sidebar-list'>
  
          <li className='sidebar-list-item' key="dashboard">
            <Link to="/staff-dashboard">
              <BsGrid1X2Fill className='icon' /> Dashboard
            </Link>
          </li>
        
        <li className='sidebar-list-item' key="Add-Appoinments">
          <Link to="/add-appoinments">
            <BsFillArchiveFill className='icon' /> Add Appoinments
          </Link>
        </li>
       {/* <li className='sidebar-list-item' key="customers">
          <Link to="/customers">
            <BsPeopleFill className='icon' /> Customers
          </Link>
  </li>*/}
        <li className='sidebar-list-item' key="inventory">
          <Link to="/staff-dashboard/create-designs">
            <BsListCheck className='icon' /> Create Design
          </Link>
        </li>
        <li className='sidebar-list-item' key="reports">
          <Link to="/reports">
            <BsMenuButtonWideFill className='icon' /> Chat
          </Link>
        </li>
        <li className='sidebar-list-item' key="settings">
          <Link to="/settings">
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
