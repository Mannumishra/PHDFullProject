import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import g20 from "../../Images/g20.png";
import azadi from "../../Images/Azadi-Ka-Amrit.png";
import skill from "../../Images/skill-india.png";

const Header = () => {
  const menuData = [
    { name: "Home", link: "/" },
    {
      name: "About Us",
      subMenu: [
        { name: "Meet IIRHE", link: "/about/meet-iirhe" },
        {
          name: "Why Pursue a PHD?",
          link: "/about/why-pursue-phd",
        },
      ],
    },
    { name: "Discplines", link: "/discipline" },
    {
      name: "For Students",
      link: "/students",
      subMenu: [
        { name: "Admissions and Mentorship Program", link: "/students" },
        { name: "Mentorship Request Form For PHD Candidates", link: "/mentorship-request-form" },
      ],
    },
    {
      name: "For Mentors",
      link: "#",
      subMenu: [
        { name: "Why Become a Mentor?", link: "/for-mentor/why-become-mentor" },
        {
          name: "Mentor Onboarding Form",
          link: "/mentor-onboarding-form",
        },
      ],
    },
    // {
    //   name: "All Forms",
    //   link: "#",
    //   subMenu: [
    //     { name: "phd-guide-registration-form", link: "/phd-guide-registration-form" },
    //     {
    //       name: "Mentor Onboarding Form",
    //       link: "/mentor-onboarding-form",
    //     },
    //     {
    //       name: "Mentorship Request Form",
    //       link: "/mentorship-request-form",
    //     },
    //   ],
    // },
    { name: "University", link: "/univercity" },
    { name: "Our Guide", link: "/our-guide" },
    { name: "Resource Center", link: "/resource-center" },
    { name: "Contact Us", link: "/contact" },
  ];

  const [menu, setmenu] = useState(false);
  const handleMenuToggle = () => {
    setmenu(!menu);
  };

  return (
    <>
      <header>
        <div className="above-line container-fluid">
          <div className="contact-info">
            <div className="single-info">
              <i class="bi bi-telephone-outbound"></i>
              <a href="tel:+918130543714">+91-8860426125</a>
            </div>
            <div className="single-info">
              <i class="bi bi-envelope"></i>
              <a href="mailto:phd@gmail.com">phd@gmail.com</a>
            </div>
          </div>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i class="bi bi-facebook"></i>
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <i class="bi bi-youtube"></i>
            </a>
          </div>

          {/* <div className="login-links">
            <Link to="/registration">Log in as Guide</Link>
            <Link to="/login">Sign Up</Link>
          </div> */}
        </div>

        <div className="head">
          <div>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Manovaidya logo" />
              </Link>
              <div className="poster text-center">
                <h3 style={{color:'#153067'}}>
                  Indian Institute of Research and Higher Education
                </h3>
                <h4 style={{color:'#153067'}}>भारतीय अनुसंधान एवं उच्च शिक्षा संस्थान </h4>
              </div>
            </div>

            <div className="side-icons">
              <div className="icon hamburger" onClick={handleMenuToggle}>
                <i class="bi bi-list"></i>
              </div>
            </div>
          </div>

          <div className="headingImageMain">
            <img
              className="headerImage"
              src={azadi}
              alt="Azadi Ka Amrit Mohotsav"
            />
            <img className="headerImage" src={g20} alt="G-20" />
            <img className="headerImage" src={skill} alt="Skills Development" />
          </div>
        </div>

        {/* Nav Links */}
        <div className={`nav-links ${menu ? "active" : ""}`}>
          <ul>
            {menuData.map((item, index) => (
              <li key={index} className={item.subMenu ? "dropdown" : ""}>
                <Link to={item.link}>{item.name}</Link>

                {/* Render first-level dropdown */}
                {item.subMenu && (
                  <ul className="dropdown-menu">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={subItem.subMenu ? "dropdown" : ""}
                      >
                        <Link to={subItem.link} onClick={handleMenuToggle}>
                          {subItem.name}
                        </Link>
                        {subItem.subMenu && (
                          <ul className="dropdown-menu">
                            {subItem.subMenu.map((subSubItem, subSubIndex) => (
                              <li key={subSubIndex}>
                                <Link
                                  to={subSubItem.link}
                                  onClick={handleMenuToggle}
                                >
                                  {subSubItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
