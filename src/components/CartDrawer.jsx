import React from "react";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

const CartDrawer = ({ isCartOpen, toggleCart }) => {
  const { cart, decrementItem, incrementItem, removeLineItem, getTotalPrice } = useCart();


  // Click on the overlay => close cart
  const handleOverlayClick = () => {
    toggleCart(); // closes
  };

  // Click inside the cart => do NOT close
  const handleCartClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`cart-overlay ${isCartOpen ? "open" : ""}`} onClick={handleOverlayClick}>
      <div className="cart-drawer" onClick={handleCartClick}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button onClick={toggleCart}>X</button>
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => {
              const qty = item.quantity || 1;
              const price = item.CurrentPrice || 0;
              return (
                <div className="cart-drawer-item" key={index}>
                  <img
                    src={item.PosterURL}
                    alt={item.Title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{item.Title}</h4>
                    <p>Price: ${price.toFixed(2)}</p>

                    {/* Quantity controls */}
                    <div className="qty-controls">
                      <button onClick={() => decrementItem(item.id)}>-</button>
                      <span>{qty}</span>
                      <button onClick={() => incrementItem(item.id)}>+</button>
                    </div>

                    <p>Line Total: ${(qty * price).toFixed(2)}</p>

                    {/* Remove entire line item if desired */}
                    <button className="remove-line" onClick={() => removeLineItem(item.id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-drawer-footer">
          <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;