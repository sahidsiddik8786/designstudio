import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { Link, useLocation } from "react-router-dom";
import "./HeaderFooter.css"; // Import your custom CSS file
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import Chat from "../../pages/DesignIdeas/chat";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  };
  
  const isShopPage = location.pathname === "/Shop";

  const fontSize = "24px"; // Adjust the font size as needed
  const marginRight = "15px"; // Adjust the space between each Nav.Link as needed

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect sticky="top">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Link to="/" style={{ color: "white", fontSize, textTransform: 'none' }} className="navbar-brand">
          DESIGN STUDIO
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <Navbar.Collapse
            id="navbarTogglerDemo01"
            className="justify-content-left"
          >
            <Nav className="mb-2 mb-lg-0">

            {auth.user?.role !== "1" && auth.user?.role !== "2" && (
  <Nav.Link as={Link} to="/"  style={{
    backgroundColor: "", // Purple color similar to the button in the image
    color: "white",
    fontSize: "24px", // Increased font size for larger text
    marginRight: "12px", // Adjust the spacing as needed
    textTransform: 'none',
    display: 'inline-block',
    padding: '17px 30px', // Increased padding for a larger button
    borderRadius: '35px', // Adjusted for visual proportionality
    textAlign: 'center',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
  }} className="nav-link custom-font">
    Interior
  </Nav.Link>
)}

{auth.user?.role !== "1" && auth.user?.role !== "2" && (
 <Nav.Link
 as={Link}
 to="/Shop"
 style={{
   backgroundColor: "#FF0000", // Purple color similar to the button in the image
   color: "white",
   fontSize: "24px", // Increased font size for larger text
   marginRight: "12px", // Adjust the spacing as needed
   textTransform: 'none',
   display: 'inline-block',
   padding: '17px 30px', // Increased padding for a larger button
   borderRadius: '35px', // Adjusted for visual proportionality
   textAlign: 'center',
   textDecoration: 'none',
   border: 'none',
   cursor: 'pointer',
   boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
 }}
 className="nav-link custom-font"
>
 Shop Now
</Nav.Link>

)}

{auth.user?.role !== "1" && auth.user?.role !== "2" && (
  
  <Nav.Link
    as={Link}
    to="/Explore-Designs"
    style={{
      backgroundColor: "", // Purple color similar to the button in the image
      color: "white",
      fontSize: "24px", // Increased font size for larger text
      marginRight: "12px", // Adjust the spacing as needed
      textTransform: 'none',
      display: 'inline-block',
      padding: '17px 30px', // Increased padding for a larger button
      borderRadius: '35px', // Adjusted for visual proportionality
      textAlign: 'center',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
    }}
    className="nav-link custom-font"
  >
    Designs
  </Nav.Link>
)}


{auth.user?.role !== "1" && auth.user?.role !== "2" && (
  <Nav.Link
    as={Link}
    to="/chat"
    style={{
      backgroundColor: "", // Purple color similar to the button in the image
      color: "white",
      fontSize: "24px", // Increased font size for larger text
      marginRight: "12px", // Adjust the spacing as needed
      textTransform: 'none',
      display: 'inline-block',
      padding: '17px 30px', // Increased padding for a larger button
      borderRadius: '35px', // Adjusted for visual proportionality
      textAlign: 'center',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
    }}
    className="nav-link custom-font"
  >
    Chat
  </Nav.Link>
)}

              
{auth.user?.role !== "1" && auth.user?.role !== "2" && (
  <div className="nav-item">
    <Nav.Link
      as={Link}
      to="/cart"
      style={{
        backgroundColor: "", // Purple color similar to the button in the image
        color: "white",
        fontSize: "24px", // Increased font size for larger text
        marginRight: "12px", // Adjust the spacing as needed
        textTransform: 'none',
        display: 'inline-block',
        padding: '17px 30px', // Increased padding for a larger button
        borderRadius: '35px', // Adjusted for visual proportionality
        textAlign: 'center',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
      }}
      className="nav-link custom-font"
    >
      <i className='fas fa-shopping-cart'></i> Cart
    </Nav.Link>
  </div>
)}


              
              {!auth.user ? (
                <Nav.Link as={Link} to="/login"  style={{
                  backgroundColor: "#8A2BE2", // Purple color similar to the button in the image
                  color: "white",
                  fontSize: "24px", // Increased font size for larger text
                  marginRight: "12px", // Adjust the spacing as needed
                  textTransform: 'none',
                  display: 'inline-block',
                  padding: '17px 30px', // Increased padding for a larger button
                  borderRadius: '35px', // Adjusted for visual proportionality
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
                }}
                 className="nav-link custom-font">
                  <i className='fas fa-user'></i> SignIn
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={<span style={{
                    backgroundColor: "#8A2BE2", // Purple color similar to the button in the image
                    color: "white",
                    fontSize: "20px", // Increased font size for larger text
                    marginRight: "12px", // Adjust the spacing as needed
                    textTransform: 'none',
                    display: 'inline-block',
                    padding: '10px 30px', // Increased padding for a larger button
                    borderRadius: '35px', // Adjusted for visual proportionality
                    textAlign: 'center',
                    textDecoration: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
                  }}>
                    {auth?.user?.firstname} {auth?.user?.lastname}</span>}
                  id="basic-nav-dropdown"
                  className="nav-dropdown"
                >
                 <NavDropdown.Item
                      as={Link}
                      to={
                        auth?.user?.role === "1" ? "/Dashboard/AdminDashboard" :
                        auth?.user?.role === "2" ? "http://localhost:3000/staff-dashboard" :
                        "/UserDashboard"
                      }
                      style={{
                        backgroundColor: "#8A2BE2", // Purple color similar to the button in the image
                        color: "white",
                        fontSize: "20px", // Increased font size for larger text
                        marginRight: "12px", // Adjust the spacing as needed
                        textTransform: 'none',
                        display: 'inline-block',
                        padding: '10px 30px', // Increased padding for a larger button
                        borderRadius: '35px', // Adjusted for visual proportionality
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
                      }}
                      className="dropdown-item custom-font"
                    >
                      Dashboard
                </NavDropdown.Item>
<div/>  <br/>
                  <NavDropdown.Item
                    onClick={handleLogout}
                    as={Link}
                    to="/login"
                    style={{
                      backgroundColor: "#FF0000", // Purple color similar to the button in the image
                      color: "white",
                      fontSize: "20px", // Increased font size for larger text
                      marginRight: "12px", // Adjust the spacing as needed
                      textTransform: 'none',
                      display: 'inline-block',
                      padding: '10px 30px', // Increased padding for a larger button
                      borderRadius: '35px', // Adjusted for visual proportionality
                      textAlign: 'center',
                      textDecoration: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' // Optional shadow for depth
                    }}
                    className="dropdown-item custom-font"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </ul>
        <ul>
          <div className="search-bar-wrapper">
            {isShopPage && <SearchInput />}
          </div>
        </ul>
      </div>
    </Navbar>
  );
};
export default Header;
