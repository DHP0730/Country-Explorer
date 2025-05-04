import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/bg01.jpg";
import Profile from "./Profile";

const Navbar = () => {

  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const toggleProfileDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  const handleLogout = () => {
    // Clear JWT token from storage
    localStorage.removeItem("token");
  
    // Redirect to login page
    window.location.href = "/login";
  
    // Close the profile dialog
    setShowProfileDialog(false);
  };
  

  return (
    <nav className="fixed w-full bg-neutral-900 text-white px-5 py-4 shadow-md z-50">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-15 w-15 object-cover rounded-full" />
          <span className="text-2xl font-semi-bold">
           CountryExplorer
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 font-medium text-lg">

              <li>
                <Link to="/home" className="hover:text-indigo-500 transition">Home</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-indigo-500 transition">Favorites</Link>
              </li>

        </ul>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-6 text-xl">

            <button onClick={toggleProfileDialog} className="hover:text-indigo-500 transition">
              <FaUserCircle />
            </button>

            {/* Profile Dialog Component */}
            {showProfileDialog && <Profile onLogout={handleLogout} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
