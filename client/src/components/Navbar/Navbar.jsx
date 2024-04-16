import "./Navbar.css";
import { useAuth } from "../../context/auth";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [auth , setAuth] = useAuth();
  return (
    <div className="nav">
      <div className="nav-logo">Design Studio</div>
      <ul className="nav-menu">
        {auth.user?.role !== "1" && (
          <>
            <Nav.Link as={Link} to="/Shop">
              <li className="nav-contact">Store</li>
            </Nav.Link>

            <Nav.Link as={Link} to="/Explore-Designs" className="nav-contact">
              <li className="nav-contact">Explore Designs</li>
            </Nav.Link>
          </>
        )}

        <Nav.Link as={Link} to="/login" className="signin">
          <li className="signin">Sign In</li>
        </Nav.Link>
        <Nav.Link
          href="https://wa.me/919061592713" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="nav-contact"
        >
          <li className="nav-contact">Contact</li>
        </Nav.Link>
      </ul>
    </div>
  );
};
export default Navbar;
