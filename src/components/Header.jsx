import Navbar from "./Navbar";
import Hamburger from "./Hamburger";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  const location = useLocation();

  useEffect(() => {
    setHamburgerOpen(false);
  }, [location]);

  return (
    <div className="header">
      {/* <div className="container"> */}
      <div className="container_fullwidth">
        <div className="top-navigation-main">
          <div className="logo">
            <a href="/">MajorDom</a>
          </div>

          <div onClick={toggleHamburger}>
            <Hamburger isOpen={hamburgerOpen} />
          </div>
        </div>
        <Navbar />
      </div>
      <style>{`
        .burger .menu-icon:after {
            width: ${hamburgerOpen ? "39px" : "20px"};
            background-color: ${hamburgerOpen ? "#fff" : "#eee"};
            opacity: ${hamburgerOpen ? "1" : ".5"};
        }
        .top-menu {
            display: ${hamburgerOpen ? "block !important" : "none"}; 
        }
        `}</style>
    </div>
  );
}

export default Header;
