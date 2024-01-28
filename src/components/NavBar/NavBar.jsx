import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <button className="dropdown" onClick={toggleDropdown}>☰ Menu</button>
      {user ?
        <nav className={dropdownOpen ? "show" : ""}>
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/closet">Closet</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
          </ul>
        </nav>
      :
        <nav className={dropdownOpen ? "show" : ""}>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>
      }
    </>
  );
};

export default NavBar;
