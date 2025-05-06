// src/components/Orders.jsx
import React, { useState } from "react";
import "./Orders.css";

const Orders = () => {
  // Mock orders data
  const [orders] = useState([
    {
      orderId: "1234",
      status: "Shipped",
      estimatedDelivery: "May 10, 2025",
      items: [
        { title: "Inception", quantity: 1, price: 14.99 },
        { title: "The Godfather", quantity: 2, price: 19.99 },
      ],
    },
    {
      orderId: "1235",
      status: "In Transit",
      estimatedDelivery: "May 12, 2025",
      items: [
        { title: "Guardians of the Galaxy Vol. 3", quantity: 1, price: 24.99 },
      ],
    },
    {
      orderId: "1236",
      status: "Delivered",
      estimatedDelivery: "Delivered on May 2, 2025",
      items: [
        { title: "Mission Impossible: Dead Reckoning", quantity: 1, price: 17.99 },
        { title: "Top Gun: Maverick", quantity: 1, price: 21.99 },
      ],
    },
  ]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => {
          const orderTotal = order.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          );

          return (
            <div className="order-card" key={order.orderId}>
              <h2>Order #{order.orderId}</h2>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p>

              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.title} &times; {item.quantity} — ${item.price.toFixed(2)} each
                    </li>
                  ))}
                </ul>
              </div>

              <p className="order-total">
                <strong>Total:</strong> ${orderTotal.toFixed(2)}
              </p>
            </div>
          );
        })
      )}

      <p className="orders-note">
        (In a real app, this page would pull your orders from your account and let you track shipping, request returns, and more.)
      </p>
    </div>
  );
};

export default Orders;
