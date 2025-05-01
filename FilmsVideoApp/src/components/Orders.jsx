// src/components/Orders.jsx
import React from "react";
import "./Orders.css"; // optional styling

const Orders = () => {
  return (
    <div className="orders-container">
      <h1>Your Orders</h1>

      <p>
        Here you can track your recent or past orders, check order statuses, 
        shipping details, or request returns. (Placeholder content)
      </p>
      <ul>
        <li>Order #1234: Shipped</li>
        <li>Order #1235: In Transit</li>
        <li>Order #1236: Delivered</li>
      </ul>

      <p>
        (You can expand this page to show detailed order info, 
        estimated delivery times, and so on.)
      </p>
    </div>
  );
};

export default Orders;
