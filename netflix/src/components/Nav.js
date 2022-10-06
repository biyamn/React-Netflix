import React, { useEffect, useState } from 'react';
import "./Nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("window.scrollY", window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        // Netflix 로고 클릭하면 리로드 해주기
        onClick={() => window.location.reload()}
      />
      <img
        alt="User logged"
        src="https://pyy0715.github.io/assets/img/uploads/profile.png"
        className="nav__avatar"
      />
    </nav>
  );
};

export default Nav;