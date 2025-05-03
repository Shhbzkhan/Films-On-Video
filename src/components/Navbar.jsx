import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Using react-icons for cart
import "./Navbar.css";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleSidebar, toggleCart}) => {
  const { getTotalItems } = useCart();
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
          <Link to="/login" className="login-link">Login</Link>
          <SearchBar />
          <div className="cart-icon" onClick={toggleCart}>
            Cart ({getTotalItems()})
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
