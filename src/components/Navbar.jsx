// src/components/Navbar.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import auth context
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"; // Added icons
import "./Navbar.css";
import SearchBar from "./SearchBar";
import supabase from "../supabaseClient";

const Navbar = ({ toggleSidebar, toggleCart }) => {
  const { getTotalItems } = useCart();
  const { user, profile } = useAuth(); // Get user and profile from auth context
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Handle click on user profile
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-logo">
          Films On Video
        </Link>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-icons">
          {user ? (
            // Show user info when logged in
            <div className="user-menu">
              <div className="user-profile" onClick={toggleDropdown}>
                <FaUser className="user-icon" />
                <span className="username">
                  {profile ? `${profile.first_name} ${profile.last_name}` : user.email.split('@')[0]}
                </span>
              </div>
              {showDropdown && (
                <div className="user-dropdown">
                  <Link to="/account" className="dropdown-item">My Account</Link>
                  <Link to="/orders" className="dropdown-item">My Orders</Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-button">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show login link if not logged in
            <Link to="/login" className="login-link">Login</Link>
          )}
          <SearchBar />
          <div className="cart-icon" onClick={toggleCart}>
            <FaShoppingCart />
            <span className="cart-count">({getTotalItems()})</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
