// src/components/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const {
    cart,
    incrementItem,
    decrementItem,
    removeLineItem,
    getTotalPrice
  } = useCart();

  const totalPrice = getTotalPrice();

  return (
    <div className="cart-page-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cart.map(item => {
            const {
              lineId,
              Title,
              PosterURL,
              price,
              quantity
            } = item;
            const lineTotal = price * quantity;

            return (
              <div className="cart-item" key={lineId}>
                <img
                  src={PosterURL || 'https://via.placeholder.com/150'}
                  alt={Title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{Title}</h4>
                  <p>Unit Price: ${price.toFixed(2)}</p>

                  <div className="qty-controls">
                    <button onClick={() => decrementItem(lineId)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => incrementItem(lineId)}>+</button>
                  </div>

                  <p>Total: ${lineTotal.toFixed(2)}</p>

                  <button
                    className="remove-line"
                    onClick={() => removeLineItem(lineId)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <div className="cart-summary-buttons">
            <Link to="/" className="continue-shopping">← Continue Shopping</Link>
            <button
              className="checkout-button"
              onClick={() => {
              // Navigate to success page
              window.location.href = '/cart-success';
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
