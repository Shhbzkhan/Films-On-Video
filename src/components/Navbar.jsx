import React from "react";
import { useCart } from "../context/CartContext";
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

        Films On Video
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
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
