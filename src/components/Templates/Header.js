import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

/**
 * Navbar that allows users to traverse the website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} id - The id of the current user
 */
const Header = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  /**
   * For creating the header as a drop down menu if the screen does not
   *      meet a standard computer's size
   */
  const handleClick = async () => {
    if (currentUser) await logout();
    //possibly POST logout success
    setDropOpen(false);
    if (open === true) setOpen(false);
    history.push("login");
  };

  /**
   * Creates the link that the user wants to navigate to when a button is clicked
   * @param {*} link the link that the user wants to navigate to
   */
  const handleLink = (link) => {
    if (open === true) setOpen(false);
    history.push(`/${link}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Link
          data-cy="homeLink"
          to="#"
          onClick={() => handleLink("")}
          className="navbar-brand"
        >
          <FontAwesomeIcon size="lg" icon={faGamepad} />
        </Link>

        <Navbar.Toggle onClick={() => setOpen(!open)} />

        <Navbar.Collapse in={open} className="justify-content-stretch">
          <ul className="navbar-nav ml-auto">
            <li
              data-cy="gamesLink"
              className="nav-item"
              onClick={() => handleLink("games")}
            >
              <Link to="#" className="nav-link">
                Play
              </Link>
            </li>
            <li
              data-cy="contactLink"
              className="nav-item"
              onClick={() => handleLink("contact")}
            >
              <Link to="#" className="nav-link">
                Contact
              </Link>
            </li>
            <li
              data-cy="tutorialLink"
              className="nav-item"
              onClick={() => handleLink("tutorial")}
            >
              <Link to="#" className="nav-link">
                Tutorials
              </Link>
            </li>
            <li
              data-cy="aboutLink"
              className="nav-item"
              onClick={() => handleLink("about")}
            >
              <Link to="#" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item" data-cy="navDropdown">
              <NavDropdown
                onMouseEnter={() => setDropOpen(true)}
                onMouseLeave={() => setDropOpen(false)}
                onClick={() => setDropOpen(!dropOpen)}
                show={dropOpen}
                title={id}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item data-cy="logLink" onClick={handleClick}>
                  {" "}
                  {currentUser ? "Log out" : "Sign in"}
                </NavDropdown.Item>
                <NavDropdown.Item
                  data-cy="accountLink"
                  onClick={() => handleLink("account")}
                >
                  Manage Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  data-cy="statsLink"
                  onClick={() => handleLink("stats")}
                >
                  Your stats
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
