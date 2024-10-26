import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import module from "./header.module.css";
import Navbar from "../Navbar/Index";
function Index({ toggleNavbar }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleNavbar = () => {
    setIsVisible(!isVisible);
    toggleNavbar();
  };

  return (
    <>
      <div className={module.topHeader}>
        {!isVisible ? (
          <button onClick={handleNavbar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        ) : (
          <button onClick={handleNavbar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      <Navbar toggleNavbar={toggleNavbar} visible={isVisible} />
    </>
  );
}

export default Index;
