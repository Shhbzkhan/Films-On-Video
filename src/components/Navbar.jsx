// src/components/Navbar.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import supabase from "../supabaseClient";

const Navbar = ({ toggleSidebar }) => { // 🔥 removed toggleCart (not needed anymore)
  const { getTotalItems } = useCart();
  const { user, profile } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
            <Link to="/login" className="login-link">Login</Link>
          )}

          <SearchBar />

          {/* 🔥 Updated: Cart icon is now a Link */}
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span className="cart-count">({getTotalItems()})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
