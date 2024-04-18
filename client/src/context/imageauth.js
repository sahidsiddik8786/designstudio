import { useAuth } from "./auth";
import { useState , useEffect} from "react";
import anime from  "../../src/assets/anime.jpg"

const ImageWithAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    // Check if the user is logged in
    if (auth.user && auth.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  const handleClick = (e) => {
    // Prevent default action
    e.preventDefault();

    // Check if user is logged in
    if (isLoggedIn) {
      window.open("http://localhost:8501/", "_blank");
    } else {
      // Redirect to login page if not logged in
      window.location.href = "/login"; // Adjust the login page URL accordingly
    }
  };

  return (
    <div className="image-overlay">
      <a
        href="http://localhost:8501/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <img src={anime} alt="Overlay Image" />
      </a>
    </div>
  );
};

export default ImageWithAuth;
